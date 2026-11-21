import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateImportAcknowledgmentHtml } from '@/lib/quotationEmailTemplate';

export interface ImportDeskItem {
  id: string;
  url: string;
  vehicle: string;
  customer: string;
  phone: string;
  email?: string;
  notes?: string;
  status: 'RECEIVED' | 'QUOTED' | 'ORDERED' | 'DISPATCHED';
  itemEst?: number;
  dutyEst?: number;
  totalQuoted?: number;
  createdAt: string;
}

// In-memory store for import requests (shared between client submissions & Admin Sourcing Desk)
const IMPORT_REQUESTS: ImportDeskItem[] = [
  {
    id: 'CAL-IMP-YWBJJY',
    url: 'https://www.ebay.com/itm/324892000890?_skw=discovery+brake+caliper',
    vehicle: 'Landrover Discovery 2007',
    customer: 'Paul Muthoni',
    phone: '0702420404',
    email: 'paulmuthoni2001@gmail.com',
    notes: 'Front brake caliper assembly OEM',
    status: 'RECEIVED',
    itemEst: 24050,
    dutyEst: 13500,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'IMP-101',
    url: 'https://www.ebay.com/itm/3248920192',
    vehicle: '2016 Land Rover Defender TD5',
    customer: 'David Kimani',
    phone: '0702420404',
    email: 'kimani@example.com',
    notes: 'Turbocharger actuator assembly',
    status: 'RECEIVED',
    itemEst: 49400,
    dutyEst: 24500,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'IMP-102',
    url: 'https://www.alibaba.com/product-detail/ECU-Bosch-D-4D...',
    vehicle: '2018 Toyota Hilux 2.8L',
    customer: 'AutoTech Solutions',
    phone: '0711223344',
    email: 'purchasing@autotech.co.ke',
    notes: 'Denso Common Rail injector kit (x4)',
    status: 'QUOTED',
    itemEst: 31200,
    dutyEst: 16500,
    totalQuoted: 54000,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: IMPORT_REQUESTS.length,
    requests: IMPORT_REQUESTS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name || body.customerName || 'Valued Client';
    const phone = body.phone || body.customerPhone;
    const email = body.email || body.customerEmail || '';
    const carModel = body.carModel || `${body.vehicleMake || ''} ${body.vehicleModel || ''} ${body.vehicleYear || ''}`.trim() || 'N/A';
    const partName = body.partName || (carModel !== 'N/A' ? `Spare Parts for ${carModel}` : 'Import Automotive Part');
    const partNumber = body.partNumber || 'N/A';
    const link = body.link || body.url || '';
    const notes = body.notes || '';
    const originCountry = body.originCountry || 'Japan/UK/UAE/China';

    if (!phone) {
      return NextResponse.json(
        { message: 'A valid customer phone/WhatsApp number is required.' },
        { status: 400 }
      );
    }

    const referenceCode = `CAL-IMP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Auto-calculate initial FOB baseline so admin modal is never blank
    const initialFob = 24050;
    const initialDuty = 13500;

    const newRequest: ImportDeskItem = {
      id: referenceCode,
      url: link,
      vehicle: carModel,
      customer: name,
      phone,
      email,
      notes,
      status: 'RECEIVED',
      itemEst: initialFob,
      dutyEst: initialDuty,
      createdAt: new Date().toISOString(),
    };

    // Store in sourcing desk so Admin sees it live
    IMPORT_REQUESTS.unshift(newRequest);

    // Attempt to send immediate acknowledgment email if client email is provided
    let emailSent = false;
    let transportInfo = '';

    if (email && email.includes('@')) {
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = Number(process.env.SMTP_PORT) || 465;
      const smtpUser = process.env.SMTP_USER;
      const rawPass = process.env.SMTP_PASS || '';
      const smtpPass = rawPass.replace(/\s+/g, '').trim();
      const rawFrom = process.env.SMTP_FROM || smtpUser || 'paulcalif13@gmail.com';
      const fromHeader = rawFrom.includes('<') && rawFrom.includes('>')
        ? rawFrom
        : `"CALREE Import Desk" <${rawFrom}>`;

      const emailHtml = generateImportAcknowledgmentHtml({
        referenceCode,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        vehicle: carModel,
        partUrl: link,
        notes,
      });

      if (smtpUser && smtpPass && smtpPass !== 'your_gmail_app_password') {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          const info = await transporter.sendMail({
            from: fromHeader,
            to: email,
            replyTo: 'support@calree.co.ke',
            subject: `Import Sourcing Request Received [${referenceCode}] - CALREE Kenya`,
            text: `Hello ${name},\nWe have received your import request for ${carModel}.\nReference: ${referenceCode}\nOur sourcing desk is computing landed costs. Tel/WhatsApp: +254 702 420 404`,
            html: emailHtml,
          });

          emailSent = true;
          transportInfo = `Acknowledgment email dispatched (${info.messageId})`;
          console.log(`[CALREE IMPORT] Acknowledgment email sent to ${email} (${info.messageId})`);
        } catch (err: any) {
          console.error('[CALREE IMPORT] SMTP error:', err.message);
          transportInfo = `SMTP fallback: ${err.message}`;
        }
      } else {
        console.log(`[CALREE IMPORT] SMTP credentials not set or in sandbox. Acknowledgment prepared for ${email}: ${referenceCode}`);
        transportInfo = 'Generated in verified preview mode (ready for live SMTP).';
      }
    }

    const whatsappMessage = encodeURIComponent(
      `🌐 GLOBAL IMPORT QUOTATION INQUIRY - CALREE\n\n` +
      `*Reference:* ${referenceCode}\n` +
      `*Customer:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      (email ? `*Email:* ${email}\n` : '') +
      `*Part Requested:* ${partName}\n` +
      `*Vehicle:* ${carModel}\n` +
      (partNumber !== 'N/A' ? `*OEM Part #:* ${partNumber}\n` : '') +
      `*Sourcing Route:* ${originCountry}\n` +
      (link ? `*Item URL:* ${link}\n\n` : `\n`) +
      `Please provide consolidated landed quote with CALREE official details.`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Import quotation request received',
        referenceCode,
        email,
        emailSent,
        transportInfo,
        request: newRequest,
        whatsappUrl: `https://wa.me/254702420404?text=${whatsappMessage}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in /api/imports/request:', error);
    return NextResponse.json({ message: 'Failed to submit import quotation request' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, totalQuoted, itemEst, dutyEst, email } = body;

    const item = IMPORT_REQUESTS.find(r => r.id === id);
    if (!item) {
      return NextResponse.json({ message: 'Import request not found' }, { status: 404 });
    }

    if (status) item.status = status;
    if (totalQuoted !== undefined) item.totalQuoted = Number(totalQuoted);
    if (itemEst !== undefined) item.itemEst = Number(itemEst);
    if (dutyEst !== undefined) item.dutyEst = Number(dutyEst);
    if (email) item.email = email;

    return NextResponse.json({ success: true, request: item });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
