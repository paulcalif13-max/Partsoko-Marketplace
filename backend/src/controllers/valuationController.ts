import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Submit vehicle for official valuation
// @route   POST /api/valuations
// @access  Public
export const submitValuation = async (req: Request, res: Response) => {
  try {
    const { customerName, customerPhone, vehicleReg, makeModel, year, vin, location, purpose, userId } = req.body;

    if (!vehicleReg || !makeModel || !year || !location) {
      return res.status(400).json({ message: 'Missing required vehicle valuation details' });
    }

    const valuation = await prisma.valuationRequest.create({
      data: {
        customerName: customerName || null,
        customerPhone: customerPhone || null,
        vehicleReg,
        makeModel,
        year: parseInt(year.toString()),
        vin: vin || null,
        location,
        purpose: purpose || 'general',
        userId: userId || null,
        status: 'PENDING'
      }
    });

    res.status(201).json({
      message: 'Valuation appointment scheduled successfully',
      valuation,
      referenceCode: `VAL-${valuation.id.substring(0, 6).toUpperCase()}`
    });
  } catch (error) {
    console.error('Error in submitValuation:', error);
    res.status(500).json({ message: 'Failed to submit valuation request' });
  }
};

// @desc    Get valuation requests for Valuer dashboard
// @route   GET /api/valuations/valuer
// @access  Private/Valuer
export const getValuerJobs = async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await prisma.valuationRequest.findMany({
      where: {
        OR: [
          { valuerId: req.user?.id },
          { valuerId: null, status: 'PENDING' }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch valuation jobs' });
  }
};

// @desc    Valuer submits completed valuation report
// @route   PUT /api/valuations/:id/report
// @access  Private/Valuer
export const submitValuationReport = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { estimatedValue, reportUrl } = req.body;

    const updated = await prisma.valuationRequest.update({
      where: { id },
      data: {
        estimatedValue: Number(estimatedValue),
        reportUrl: reportUrl || null,
        status: 'COMPLETED',
        valuerId: req.user?.id
      }
    });

    res.json({ message: 'Valuation report submitted successfully', valuation: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit report' });
  }
};
