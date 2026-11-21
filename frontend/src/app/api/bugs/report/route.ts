import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory persistent list of submitted bug reports
interface BugReport {
  id: string;
  title: string;
  description: string;
  url: string;
  browserInfo?: string;
  status: 'OPEN' | 'RESOLVED' | 'INVESTIGATING';
  createdAt: string;
}

const BUG_REPORTS: BugReport[] = [
  {
    id: 'BUG-INIT-01',
    title: 'Platform System Audit & Monitoring',
    description: 'System health check and diagnostic monitoring initialized.',
    url: 'https://www.partsoko.co.ke',
    browserInfo: 'System Health Service',
    status: 'RESOLVED',
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: BUG_REPORTS.length,
    reports: BUG_REPORTS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, url, browserInfo } = body;

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      );
    }

    const reportId = `BUG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newReport: BugReport = {
      id: reportId,
      title,
      description,
      url: url || 'Unknown URL',
      browserInfo: browserInfo || 'Unknown Browser',
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };

    // Store in bug tracker list for admin review
    BUG_REPORTS.unshift(newReport);

    // Attempt to email support if SMTP is configured
    const supportEmail = process.env.SUPPORT_EMAIL || 'support@calree.co.ke';
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const rawPass = process.env.SMTP_PASS || '';
    const smtpPass = rawPass.replace(/\s+/g, '').trim();

    if (smtpHost && smtpUser && smtpPass && smtpPass !== 'your_gmail_app_password') {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"CALREE Bug Alert" <${smtpUser}>`,
          to: supportEmail,
          subject: `🚨 [CALREE BUG REPORT ${reportId}] ${title}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background-color: #0B1120; color: #FFFFFF; border-radius: 12px;">
              <h2 style="color: #00D066; margin-top: 0;">🚨 New CALREE Issue Reported</h2>
              <p><strong>Report ID:</strong> ${reportId}</p>
              <p><strong>Title:</strong> ${title}</p>
              <p><strong>Page URL:</strong> <a href="${url}" style="color: #00D066;">${url}</a></p>
              <div style="background-color: #1E293B; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>Description:</strong>
                <p style="white-space: pre-wrap; margin-top: 6px; color: #E2E8F0;">${description}</p>
              </div>
              <p style="font-size: 11px; color: #94A3B8;"><strong>Browser:</strong> ${browserInfo}</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn('Bug notification email skipped or failed:', mailErr);
      }
    } else {
      console.log(`[Bug Report Received - ${reportId}]: "${title}" on ${url}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Bug report received. Thank you for helping us improve CALREE!',
      reportId,
      report: newReport,
      supportWhatsApp: '+254 702 420 404',
    });
  } catch (error: any) {
    console.error('Bug report error:', error);
    return NextResponse.json({ message: 'Failed to submit report', error: error.message }, { status: 500 });
  }
}
