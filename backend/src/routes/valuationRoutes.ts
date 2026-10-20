import express from 'express';
import {
  submitValuation,
  getValuerJobs,
  submitValuationReport
} from '../controllers/valuationController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', submitValuation);
router.get('/valuer', protect, authorize('VALUER', 'ADMIN'), getValuerJobs);
router.put('/:id/report', protect, authorize('VALUER', 'ADMIN'), submitValuationReport);

export default router;
