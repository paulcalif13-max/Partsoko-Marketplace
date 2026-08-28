import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middleware/authMiddleware';
import axios from 'axios';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' });

// ========================================
// M-PESA DARAJA API INTEGRATION
// ========================================

// @desc    Initiate M-Pesa STK Push
// @route   POST /api/payments/mpesa/stkpush
// @access  Private (Buyer)
export const initiateMpesaPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, phoneNumber } = req.body; // e.g., 254702420404

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // 1. Get Daraja OAuth Token (Simplified for illustration)
    // const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    // const tokenResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    //   headers: { Authorization: `Basic ${auth}` }
    // });
    // const accessToken = tokenResponse.data.access_token;

    // 2. Format Phone Number and Password
    // const shortCode = process.env.MPESA_SHORTCODE;
    // const passkey = process.env.MPESA_PASSKEY;
    // const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    // const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    // 3. Initiate STK Push
    // const stkResponse = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    //   BusinessShortCode: shortCode,
    //   Password: password,
    //   Timestamp: timestamp,
    //   TransactionType: 'CustomerPayBillOnline',
    //   Amount: Math.ceil(order.totalAmount), // M-Pesa requires integers
    //   PartyA: phoneNumber,
    //   PartyB: shortCode,
    //   PhoneNumber: phoneNumber,
    //   CallBackURL: `${process.env.BASE_URL}/api/payments/mpesa/callback`,
    //   AccountReference: `PARTSOKO_${order.id}`,
    //   TransactionDesc: 'Spare Parts Purchase'
    // }, {
    //   headers: { Authorization: `Bearer ${accessToken}` }
    // });

    // res.json(stkResponse.data);
    
    // MOCK RESPONSE FOR NOW
    res.json({ message: 'STK Push initiated successfully to ' + phoneNumber, CheckoutRequestID: 'ws_CO_123456789' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to initiate M-Pesa payment' });
  }
};

// @desc    M-Pesa Webhook Callback
// @route   POST /api/payments/mpesa/callback
// @access  Public
export const mpesaCallback = async (req: Request, res: Response) => {
  try {
    const callbackData = req.body.Body.stkCallback;
    
    // Extract ResultCode (0 means success)
    if (callbackData.ResultCode === 0) {
      // Payment successful, update order status
      // We would extract the orderId from the metadata or cache
      console.log('Payment successful:', callbackData);
      
      // await prisma.order.update({
      //   where: { id: extractedOrderId },
      //   data: { status: 'PROCESSING' }
      // });
    } else {
      console.log('Payment failed:', callbackData.ResultDesc);
    }

    // Acknowledge receipt to Safaricom
    res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    res.status(500).send('Webhook error');
  }
};

// ========================================
// STRIPE INTEGRATION (CARDS)
// ========================================

// @desc    Create Stripe Payment Intent
// @route   POST /api/payments/stripe/create-intent
// @access  Private (Buyer)
export const createStripePaymentIntent = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.body;
    
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(order.totalAmount * 100), // Stripe expects cents
    //   currency: 'usd',
    //   metadata: { orderId: order.id },
    // });

    // res.json({ clientSecret: paymentIntent.client_secret });
    
    // MOCK RESPONSE FOR NOW
    res.json({ clientSecret: 'pi_12345_secret_67890' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
};

// @desc    Stripe Webhook
// @route   POST /api/payments/stripe/webhook
// @access  Public
export const stripeWebhook = async (req: Request, res: Response) => {
  // Stripe webhook logic to verify signature and update order status
  // const sig = req.headers['stripe-signature'];
  // let event;
  // try {
  //   event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  // } catch (err) {
  //   return res.status(400).send(`Webhook Error`);
  // }
  
  // if (event.type === 'payment_intent.succeeded') {
  //   const paymentIntent = event.data.object;
  //   // Update order using paymentIntent.metadata.orderId
  // }
  
  res.status(200).json({ received: true });
};
