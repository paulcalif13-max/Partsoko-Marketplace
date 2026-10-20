import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const reportBug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, url, browserInfo } = req.body;

    // Create a transporter using ethereal email or a real SMTP if configured in ENV
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
        pass: process.env.SMTP_PASS || 'ethereal.pass',
      },
    });

    const mailOptions = {
      from: '"PARTSOKO Bug Reporter" <bugs@partsoko.co.ke>',
      to: process.env.SUPPORT_EMAIL || 'partsoko@gmail.com',
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
    
    res.status(200).json({ message: 'Bug report sent successfully' });
  } catch (error) {
    console.error('Error sending bug report:', error);
    res.status(500).json({ message: 'Failed to send bug report' });
  }
};
