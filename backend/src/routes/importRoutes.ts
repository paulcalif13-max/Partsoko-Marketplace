import express from 'express';
import {
  submitImportRequest,
  getMyImportRequests,
  getAdminImportRequests,
  updateImportQuote
} from '../controllers/importController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', submitImportRequest);
router.get('/my-requests', protect, getMyImportRequests);
router.get('/admin', protect, authorize('ADMIN'), getAdminImportRequests);
router.put('/:id/quote', protect, authorize('ADMIN'), updateImportQuote);

export default router;
