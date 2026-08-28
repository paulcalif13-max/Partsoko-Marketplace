import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

// @desc    Get global settings (commissions/taxes)
// @route   GET /api/admin/settings
// @access  Private/Admin
export const getSettings = async (req: AuthRequest, res: Response) => {
  try {
    let settings = await prisma.settings.findUnique({ where: { id: 'global' } });
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 'global', commissionPercent: 5.0, importTaxPercent: 16.0 }
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update global settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
export const updateSettings = async (req: AuthRequest, res: Response) => {
  try {
    const { commissionPercent, importTaxPercent } = req.body;
    
    const settings = await prisma.settings.upsert({
      where: { id: 'global' },
      update: {
        commissionPercent: Number(commissionPercent),
        importTaxPercent: Number(importTaxPercent),
      },
      create: {
        id: 'global',
        commissionPercent: Number(commissionPercent),
        importTaxPercent: Number(importTaxPercent),
      }
    });
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating settings' });
  }
};

// @desc    Update user status (Approve/Suspend)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
export const updateUserStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body; // 'ACTIVE', 'SUSPENDED', 'REJECTED'
    
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { status }
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating user status' });
  }
};
