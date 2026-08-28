import express from 'express';
import { 
  getUsers, 
  getSettings, 
  updateSettings,
  updateUserStatus
} from '../controllers/adminController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Apply auth and admin check to all routes in this file
router.use(protect, authorize('ADMIN'));

router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);
router.route('/settings')
  .get(getSettings)
  .put(updateSettings);

export default router;
