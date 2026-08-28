import express from 'express';
import { 
  createOrder, 
  getMyOrders, 
  getOrderById,
  getSellerOrders
} from '../controllers/orderController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createOrder);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/seller')
  .get(protect, authorize('SELLER', 'ADMIN'), getSellerOrders);

router.route('/:id')
  .get(protect, getOrderById);

export default router;
