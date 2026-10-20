import express from 'express';
import {
  requestTowing,
  getActiveTowingRequests,
  updateTowingStatus
} from '../controllers/towingController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/request', requestTowing);
router.get('/active', protect, authorize('ADMIN'), getActiveTowingRequests);
router.put('/:id/status', protect, updateTowingStatus);

export default router;
