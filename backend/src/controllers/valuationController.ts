import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Submit vehicle for official valuation
// @route   POST /api/valuations
// @access  Public
export const submitValuation = async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      clientName,
      name,
      customerPhone,
      clientPhone,
      phone,
      vehicleReg,
      vehicleRegistration,
      registrationNumber,
      makeModel,
      vehicleMakeModel,
      model,
      year,
      vehicleYear,
      vin,
      location,
      preferredLocation,
      purpose,
      valuationPurpose,
      userId
    } = req.body;

    const vReg = (vehicleReg || vehicleRegistration || registrationNumber || '').trim();
    const vModel = (makeModel || vehicleMakeModel || model || '').trim();
    const vYear = year || vehicleYear || 2018;
    const vLoc = (location || preferredLocation || 'Nairobi').trim();

    if (!vReg || !vModel) {
      return res.status(400).json({ message: 'Missing required vehicle valuation details (registration and model)' });
    }

    const valuation = await prisma.valuationRequest.create({
      data: {
        customerName: customerName || clientName || name || null,
        customerPhone: customerPhone || clientPhone || phone || null,
        vehicleReg: vReg,
        makeModel: vModel,
        year: parseInt(vYear.toString()),
        vin: vin || null,
        location: vLoc,
        purpose: purpose || valuationPurpose || 'general',
        userId: userId || null,
        status: 'PENDING'
      }
    });

    res.status(201).json({
      success: true,
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
