import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// ── Validation ──────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

function validateFreeTrialForm(body: any): { isValid: boolean; error?: string } {
  if (!body || typeof body !== 'object') return { isValid: false, error: 'Malformed request body.' };
  if (body.website || body.honeypot) return { isValid: false, error: 'Spam detected.' };

  const { name, email, phone, danceStyle, experienceLevel } = body;
  if (!name || typeof name !== 'string' || name.trim().length === 0) return { isValid: false, error: 'Full Name is required.' };
  if (!isValidEmail(email)) return { isValid: false, error: 'Please provide a valid email address.' };
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) return { isValid: false, error: 'Phone number is required.' };
  if (!danceStyle || typeof danceStyle !== 'string' || danceStyle.trim().length === 0) return { isValid: false, error: 'Please select a Dance Style.' };
  if (!experienceLevel || typeof experienceLevel !== 'string' || experienceLevel.trim().length === 0) return { isValid: false, error: 'Please select an Experience Level.' };
  if (body.message && typeof body.message === 'string' && body.message.length > 3000) return { isValid: false, error: 'Message is too long (max 3000 characters).' };

  return { isValid: true };
}

// ── Email Template ──────────────────────────────────────────────
function createFieldRow(label: string, value: string, isHighlight = false): string {
  const bg = isHighlight ? 'background-color: rgba(216, 167, 160, 0.06);' : 'background-color: rgba(255, 255, 255, 0.02);';
  return `<tr><td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05);${bg}width:35%;color:#D8A7A0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${label}</td><td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05);${bg}color:#F7F2EE;font-size:14px;line-height:1.5;">${value || '<span style="opacity:0.4;">Not Provided</span>'}</td></tr>`;
}

function buildHtml(eyebrow: string, title: string, fieldsHtml: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>TAAL Dance Academy</title></head><body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#F7F2EE;"><table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#050505;padding:40px 10px;"><tr><td align="center"><table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#0F0A0A;border:1px solid rgba(216,167,160,0.2);border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.8);"><tr><td style="background:linear-gradient(135deg,#1A1414 0%,#050505 100%);padding:36px 30px;text-align:center;border-bottom:1px solid rgba(216,167,160,0.15);"><p style="margin:0 0 6px 0;color:#D8A7A0;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">TAAL DANCE ACADEMY</p><h1 style="margin:0 0 10px 0;color:#F7F2EE;font-size:26px;font-weight:400;letter-spacing:0.5px;">${title}</h1><p style="margin:0;color:#E8C8B8;font-size:13px;font-style:italic;opacity:0.8;">Creating Dancers. Inspiring Lives.</p></td></tr><tr><td style="padding:32px 30px;"><p style="margin:0 0 24px 0;color:#D8A7A0;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">${eyebrow}</p><table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${fieldsHtml}</table></td></tr><tr><td style="background-color:#050505;padding:24px 30px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);"><p style="margin:0 0 6px 0;color:#F7F2EE;font-size:12px;opacity:0.5;">TAAL Dance Academy • Edmonton, AB Canada</p><p style="margin:0;color:#D8A7A0;font-size:11px;opacity:0.7;">This notification was sent securely from the TAAL Dance Academy website.</p></td></tr></table></td></tr></table></body></html>`;
}

// ── CORS Helper ─────────────────────────────────────────────────
function setCorsHeaders(res: VercelResponse, origin?: string) {
  const allowed = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173').split(',').map((o) => o.trim());
  const resolvedOrigin =
    origin && (allowed.includes(origin) || origin.includes('taaldanceacademy.ca') || origin.endsWith('.vercel.app'))
      ? origin
      : allowed[0];
  res.setHeader('Access-Control-Allow-Origin', resolvedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

// ── Handler ─────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin as string | undefined;
  setCorsHeaders(res, origin);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    const validation = validateFreeTrialForm(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, error: validation.error });
    }

    const { name, email, phone, age, danceStyle, experienceLevel, preferredClass, message } = req.body;

    const fieldsHtml = `
      ${createFieldRow('Full Name', name.trim(), true)}
      ${createFieldRow('Email Address', `<a href="mailto:${email.trim()}" style="color:#E8C8B8;text-decoration:underline;">${email.trim()}</a>`)}
      ${createFieldRow('Phone Number', phone.trim())}
      ${createFieldRow('Age', age ? age.trim() : 'Not specified')}
      ${createFieldRow('Dance Style', danceStyle.trim(), true)}
      ${createFieldRow('Experience Level', experienceLevel.trim())}
      ${createFieldRow('Preferred Class', preferredClass ? preferredClass.trim() : 'Standard Session')}
      ${createFieldRow('Message / Notes', (message || 'No additional notes.').trim().replace(/\n/g, '<br/>'))}
    `;
    const html = buildHtml('NEW FREE TRIAL REQUEST', 'Book A Free Trial Submission', fieldsHtml);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[Free Trial] RESEND_API_KEY is not configured.');
      return res.status(500).json({ success: false, error: 'Email service is not configured. Please contact us directly.' });
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'TAAL Dance Academy <no-reply@taaldanceacademy.ca>',
      to: [process.env.RECIPIENT_EMAIL || 'infoattaaldanceacademy@gmail.com'],
      replyTo: email.trim(),
      subject: 'New Free Trial Booking Request — TAAL Dance Academy',
      html,
    });

    if (result.error) {
      console.error('[Resend Free Trial Error]:', result.error);
      return res.status(500).json({ success: false, error: 'Unable to send your request. Please try again or contact us directly.' });
    }

    return res.status(200).json({ success: true, message: 'Your free trial request has been received! The TAAL team will get back to you shortly.' });
  } catch (error) {
    console.error('[POST /api/free-trial Error]:', error);
    return res.status(500).json({ success: false, error: 'An unexpected server error occurred. Please try again later.' });
  }
}
