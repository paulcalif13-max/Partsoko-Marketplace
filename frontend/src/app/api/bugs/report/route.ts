import { NextResponse } from 'next/server';
import { sendBugReportEmail } from '@/lib/emailService';

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

    // Dispatch bug alert to support
    await sendBugReportEmail({
      reportId,
      title,
      description,
      url: url || 'Unknown URL',
      browserInfo: browserInfo || 'Unknown Browser',
    });

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
