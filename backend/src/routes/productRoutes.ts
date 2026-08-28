import express from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('SELLER', 'ADMIN'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('SELLER', 'ADMIN'), updateProduct)
  .delete(protect, authorize('SELLER', 'ADMIN'), deleteProduct);

export default router;
