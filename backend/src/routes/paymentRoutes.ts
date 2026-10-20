import express from 'express';
import { 
  initiateMpesaPayment, 
  mpesaCallback
} from '../controllers/paymentController';

const router = express.Router();

// M-Pesa Routes
router.post('/mpesa/stkpush', initiateMpesaPayment);
router.post('/mpesa/callback', express.json(), mpesaCallback);

export default router;
