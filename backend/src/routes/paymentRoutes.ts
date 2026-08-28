import express from 'express';
import { 
  initiateMpesaPayment, 
  mpesaCallback, 
  createStripePaymentIntent, 
  stripeWebhook 
} from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// M-Pesa Routes
router.post('/mpesa/stkpush', protect, initiateMpesaPayment);
router.post('/mpesa/callback', express.json(), mpesaCallback); // Safaricom callback

// Stripe Routes
router.post('/stripe/create-intent', protect, createStripePaymentIntent);
// Stripe needs raw body for webhook signature verification, but we use express.json() globally.
// In a real app, this specific route would bypass global express.json()
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;
