import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Submit overseas product URL for landed cost quotation
// @route   POST /api/imports
// @access  Public (or authenticated)
export const submitImportRequest = async (req: Request, res: Response) => {
  try {
    const { url, vehicleMake, vehicleModel, vehicleYear, notes, customerName, customerPhone, customerEmail, userId } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Product URL is required' });
    }

    const importRequest = await prisma.importRequest.create({
      data: {
        url,
        vehicleMake: vehicleMake || null,
        vehicleModel: vehicleModel || null,
        vehicleYear: vehicleYear ? parseInt(vehicleYear.toString()) : null,
        notes: notes || null,
        customerName: customerName || null,
        customerPhone: customerPhone || null,
        customerEmail: customerEmail || null,
        userId: userId || null,
        status: 'RECEIVED'
      }
    });

    res.status(201).json({
      message: 'Import quotation request received successfully',
      request: importRequest,
      referenceCode: `PSK-IMP-${importRequest.id.substring(0, 6).toUpperCase()}`
    });
  } catch (error) {
    console.error('Error in submitImportRequest:', error);
    res.status(500).json({ message: 'Failed to submit import request' });
  }
};

// @desc    Get user's import requests
// @route   GET /api/imports/my-requests
// @access  Private
export const getMyImportRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.importRequest.findMany({
      where: { userId: req.user?.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your import requests' });
  }
};

// @desc    Get all import requests for Admin Sourcing Desk
// @route   GET /api/imports/admin
// @access  Private/Admin
export const getAdminImportRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.importRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true, phone: true }
        }
      }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch import requests' });
  }
};

// @desc    Admin updates quote and landed costs
// @route   PUT /api/imports/:id/quote
// @access  Private/Admin
export const updateImportQuote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { itemPriceEst, shippingEst, dutyEst, serviceFee, status } = req.body;

    const totalLandedCost = (Number(itemPriceEst) || 0) + (Number(shippingEst) || 0) + (Number(dutyEst) || 0) + (Number(serviceFee) || 0);

    const updated = await prisma.importRequest.update({
      where: { id },
      data: {
        itemPriceEst: Number(itemPriceEst) || null,
        shippingEst: Number(shippingEst) || null,
        dutyEst: Number(dutyEst) || null,
        serviceFee: Number(serviceFee) || null,
        totalLandedCost,
        status: status || 'QUOTED'
      }
    });

    res.json({ message: 'Quotation updated successfully', request: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update import quotation' });
  }
};
