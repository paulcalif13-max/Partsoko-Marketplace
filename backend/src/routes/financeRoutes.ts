import express from 'express';
import {
  submitFinanceApplication,
  getMyFinanceApplications
} from '../controllers/financeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/apply', submitFinanceApplication);
router.get('/my-applications', protect, getMyFinanceApplications);

export default router;
