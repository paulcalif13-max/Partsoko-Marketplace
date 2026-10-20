import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Submit auto financing application (Logbook, Repair, Parts, Import)
// @route   POST /api/finance/apply
// @access  Public / Authenticated
export const submitFinanceApplication = async (req: Request, res: Response) => {
  try {
    const { applicantName, phone, email, productType, requestedAmount, tenureMonths, vehicleData, userId } = req.body;

    if (!applicantName || !phone || !productType || !requestedAmount) {
      return res.status(400).json({ message: 'Missing required financing application details' });
    }

    const application = await prisma.financeApplication.create({
      data: {
        applicantName,
        phone,
        email: email || null,
        productType,
        requestedAmount: Number(requestedAmount),
        tenureMonths: tenureMonths ? Number(tenureMonths) : 12,
        vehicleData: vehicleData || null,
        userId: userId || null,
        status: 'SUBMITTED'
      }
    });

    res.status(201).json({
      message: 'Financing application received',
      application,
      referenceCode: `FIN-${application.id.substring(0, 6).toUpperCase()}`
    });
  } catch (error) {
    console.error('Error in submitFinanceApplication:', error);
    res.status(500).json({ message: 'Failed to submit finance application' });
  }
};

// @desc    Get user's financing applications
// @route   GET /api/finance/my-applications
// @access  Private
export const getMyFinanceApplications = async (req: AuthRequest, res: Response) => {
  try {
    const apps = await prisma.financeApplication.findMany({
      where: { userId: req.user?.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch finance applications' });
  }
};
