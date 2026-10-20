import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all active mechanics for public directory
// @route   GET /api/mechanics
// @access  Public
export const getMechanics = async (req: Request, res: Response) => {
  try {
    const { location, search } = req.query;

    const mechanics = await prisma.user.findMany({
      where: {
        role: 'MECHANIC',
        status: 'ACTIVE'
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        status: true,
        createdAt: true,
        _count: {
          select: { bookings: true }
        }
      }
    });

    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mechanics' });
  }
};
