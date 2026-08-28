import axios from 'axios';
// import nodemailer from 'nodemailer';

// ========================================
// EMAIL NOTIFICATIONS (Nodemailer)
// ========================================
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT),
    //   secure: true,
    //   auth: {
    //     user: process.env.SMTP_USER, // e.g. paulcalif13@gmail.com
    //     pass: process.env.SMTP_PASS,
    //   },
    // });

    // await transporter.sendMail({
    //   from: '"PARTSOKO" <paulcalif13@gmail.com>',
    //   to,
    //   subject,
    //   text,
    // });
    
    console.log(`Mock Email sent to ${to} with subject: ${subject}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// ========================================
// WHATSAPP NOTIFICATIONS (Direct Meta API)
// Number: 0702420404
// ========================================
export const sendWhatsApp = async (toPhoneNumber: string, messageText: string) => {
  try {
    // The phone number ID for 0702420404 registered in Meta Developer Portal
    const phoneNumberId = process.env.META_PHONE_NUMBER_ID || 'mock_phone_id_0702420404';
    const accessToken = process.env.META_ACCESS_TOKEN || 'mock_access_token';

    // const response = await axios.post(
    //   `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
    //   {
    //     messaging_product: 'whatsapp',
    //     to: toPhoneNumber,
    //     type: 'text',
    //     text: { body: messageText },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );

    console.log(`Mock WhatsApp sent from 0702420404 to ${toPhoneNumber}: ${messageText}`);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
