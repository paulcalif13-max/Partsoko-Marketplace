import express from 'express';
import { 
  createBooking, 
  getMechanicBookings, 
  updateBookingStatus 
} from '../controllers/bookingController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createBooking);

router.route('/mechanic')
  .get(protect, authorize('MECHANIC'), getMechanicBookings);

router.route('/:id/status')
  .put(protect, authorize('MECHANIC'), updateBookingStatus);

export default router;
