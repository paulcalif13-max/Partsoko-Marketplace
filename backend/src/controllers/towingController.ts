import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Request 24/7 emergency tow truck
// @route   POST /api/towing/request
// @access  Public
export const requestTowing = async (req: Request, res: Response) => {
  try {
    const { customerName, customerPhone, pickupLocation, destination, vehicleReg, vehicleModel, providerName, fare, userId } = req.body;

    if (!customerName || !customerPhone || !pickupLocation || !destination || !vehicleReg) {
      return res.status(400).json({ message: 'Missing required towing details' });
    }

    const towing = await prisma.towingRequest.create({
      data: {
        customerName,
        customerPhone,
        pickupLocation,
        destination,
        vehicleReg,
        vehicleModel: vehicleModel || null,
        providerName: providerName || 'Rapid Response Recovery',
        fare: fare ? Number(fare) : 3500,
        userId: userId || null,
        status: 'PENDING'
      }
    });

    res.status(201).json({
      message: 'Tow truck dispatched successfully',
      towing,
      referenceCode: `TOW-${towing.id.substring(0, 6).toUpperCase()}`
    });
  } catch (error) {
    console.error('Error in requestTowing:', error);
    res.status(500).json({ message: 'Failed to request towing service' });
  }
};

// @desc    Get active towing requests (for dispatchers / admins)
// @route   GET /api/towing/active
// @access  Private/Admin
export const getActiveTowingRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.towingRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch towing requests' });
  }
};

// @desc    Update towing request status
// @route   PUT /api/towing/:id/status
// @access  Private
export const updateTowingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // PENDING, DISPATCHED, COMPLETED, CANCELLED

    const updated = await prisma.towingRequest.update({
      where: { id },
      data: { status }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update towing status' });
  }
};
