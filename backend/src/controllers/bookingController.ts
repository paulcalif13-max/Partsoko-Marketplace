import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';
import { sendEmail, sendWhatsApp } from '../utils/notifications';

// @desc    Create a mechanic booking
// @route   POST /api/bookings
// @access  Private (Buyer)
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { mechanicId, serviceDate, notes } = req.body;

    const mechanic = await prisma.user.findUnique({ where: { id: mechanicId } });
    
    if (!mechanic || mechanic.role !== 'MECHANIC') {
      return res.status(400).json({ message: 'Invalid mechanic selected' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        mechanicId,
        serviceDate: new Date(serviceDate),
        notes,
      },
    });

    // Notify Mechanic
    if (mechanic.phone) {
      await sendWhatsApp(mechanic.phone, `New booking request from ${req.user.name} on ${new Date(serviceDate).toLocaleDateString()}. Notes: ${notes}`);
    }
    await sendEmail(mechanic.email, 'New PARTSOKO Booking', `You have a new booking from ${req.user.name}.`);

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};

// @desc    Get mechanic's bookings
// @route   GET /api/bookings/mechanic
// @access  Private (Mechanic)
export const getMechanicBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { mechanicId: req.user.id },
      include: {
        user: { select: { name: true, phone: true } }
      },
      orderBy: { serviceDate: 'asc' }
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Mechanic)
export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body; // CONFIRMED, COMPLETED, CANCELLED
    
    const booking = await prisma.booking.findUnique({ 
      where: { id: req.params.id },
      include: { user: true } 
    });

    if (!booking || booking.mechanicId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status }
    });

    // Notify User
    if (booking.user.phone) {
      await sendWhatsApp(booking.user.phone, `Your booking on PARTSOKO has been ${status} by the mechanic.`);
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating booking' });
  }
};
