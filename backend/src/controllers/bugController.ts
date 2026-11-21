import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const reportBug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, url, browserInfo } = req.body;

    // If credentials are placeholder or development, log and respond immediately
    if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_gmail_app_password') {
      console.log(`[Bug Report Received]: ${title} | ${url}`);
      res.status(200).json({ success: true, message: 'Bug report received successfully (preview mode)' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: (process.env.SMTP_PASS || '').replace(/\s+/g, '').trim(),
      },
    });

    const mailOptions = {
      from: '"CALREE Bug Reporter" <bugs@calree.co.ke>',
      to: process.env.SUPPORT_EMAIL || 'support@calree.co.ke',
      subject: `🚨 [BUG REPORT] ${title}`,
      html: `
        <h2>New Bug Report</h2>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Browser Info:</strong> ${browserInfo}</p>
        <h3>Description:</h3>
        <p>${description}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Bug report sent successfully' });
  } catch (error) {
    console.error('Error sending bug report:', error);
    res.status(500).json({ message: 'Failed to send bug report' });
  }
};
