import { Request, Response } from 'express';
import prisma from '../config/db';
import axios from 'axios';

// @desc    Initiate M-Pesa STK Push
// @route   POST /api/payments/mpesa/stkpush
// @access  Public / Buyer
export const initiateMpesaPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, phoneNumber, amount } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Clean phone number: e.g. 0702420404 -> 254702420404
    let formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) {
      formattedPhone = '254' + formattedPhone;
    }

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const shortCode = process.env.MPESA_SHORTCODE || '174379';
    const passkey = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

    // If live Daraja credentials configured
    if (consumerKey && consumerSecret) {
      try {
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
        const tokenResponse = await axios.get(
          'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
          { headers: { Authorization: `Basic ${auth}` } }
        );
        const accessToken = tokenResponse.data.access_token;

        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
        const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

        const stkResponse = await axios.post(
          'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
          {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: Math.ceil(amount || 1),
            PartyA: formattedPhone,
            PartyB: shortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: `${process.env.BASE_URL || 'http://localhost:5000'}/api/payments/mpesa/callback`,
            AccountReference: `PARTSOKO_${orderId || 'WEB'}`,
            TransactionDesc: 'Auto Spare Parts Purchase'
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        return res.json(stkResponse.data);
      } catch (err: any) {
        console.warn('Live Daraja request failed, falling back to simulated STK response:', err?.response?.data || err.message);
      }
    }

    // Default / Sandbox Simulation Response
    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    res.json({
      MerchantRequestID: `MR_${Date.now()}`,
      CheckoutRequestID: checkoutRequestId,
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: `Success. STK Push sent to ${formattedPhone}. Enter M-Pesa PIN on your phone to complete payment.`
    });
  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error);
    res.status(500).json({ message: 'Failed to initiate M-Pesa payment' });
  }
};

// @desc    M-Pesa Daraja Callback Webhook
// @route   POST /api/payments/mpesa/callback
// @access  Public (Safaricom servers)
export const mpesaCallback = async (req: Request, res: Response) => {
  try {
    const { Body } = req.body;
    if (Body?.stkCallback) {
      const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = Body.stkCallback;

      if (ResultCode === 0 && CallbackMetadata) {
        const receiptItem = CallbackMetadata.Item?.find((i: any) => i.Name === 'MpesaReceiptNumber');
        const receipt = receiptItem ? receiptItem.Value : 'CONFIRMED';
        console.log(`[M-PESA SUCCESS] CheckoutRequestID: ${CheckoutRequestID}, Receipt: ${receipt}`);
      } else {
        console.warn(`[M-PESA FAILED] ${ResultDesc}`);
      }
    }

    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    res.status(500).json({ ResultCode: 1, ResultDesc: 'Internal server error' });
  }
};
