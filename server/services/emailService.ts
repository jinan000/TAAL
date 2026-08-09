// Get Resend SDK client lazily to allow dynamic environment resolution
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder_key'
    ? process.env.RESEND_API_KEY
    : 're_placeholder_key';
  return new Resend(apiKey);
}

// Email routing defaults
const getRecipientEmail = () => process.env.RECIPIENT_EMAIL || 'infoattaaldanceacademy@gmail.com';
const getSenderEmail = () => process.env.SENDER_EMAIL || 'TAAL Dance Academy <onboarding@resend.dev>';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface FreeTrialFormData {
  name: string;
  email: string;
  phone: string;
  age?: string;
  danceStyle: string;
  experienceLevel: string;
  preferredClass?: string;
  message?: string;
}

/**
 * Shared Luxury HTML Email Wrapper for TAAL Brand Aesthetics
 */
function createEmailTemplate(headerEyebrow: string, mainTitle: string, fieldsHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TAAL Dance Academy</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #F7F2EE; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0F0A0A; border: 1px solid rgba(216, 167, 160, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1A1414 0%, #050505 100%); padding: 36px 30px; text-align: center; border-bottom: 1px solid rgba(216, 167, 160, 0.15);">
              <p style="margin: 0 0 6px 0; color: #D8A7A0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">
                TAAL DANCE ACADEMY
              </p>
              <h1 style="margin: 0 0 10px 0; color: #F7F2EE; font-size: 26px; font-weight: 400; letter-spacing: 0.5px;">
                ${mainTitle}
              </h1>
              <p style="margin: 0; color: #E8C8B8; font-size: 13px; font-style: italic; opacity: 0.8;">
                Creating Dancers. Inspiring Lives.
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 30px;">
              <p style="margin: 0 0 24px 0; color: #D8A7A0; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">
                ${headerEyebrow}
              </p>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                ${fieldsHtml}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #050505; padding: 24px 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06);">
              <p style="margin: 0 0 6px 0; color: #F7F2EE; font-size: 12px; opacity: 0.5;">
                TAAL Dance Academy • Edmonton, AB Canada
              </p>
              <p style="margin: 0; color: #D8A7A0; font-size: 11px; opacity: 0.7;">
                This notification was sent securely from the TAAL Dance Academy website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate Field Row HTML
 */
function createFieldRow(label: string, value: string, isHighlight = false): string {
  const bgStyle = isHighlight ? 'background-color: rgba(216, 167, 160, 0.06);' : 'background-color: rgba(255, 255, 255, 0.02);';
  return `
    <tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); ${bgStyle} width: 35%; color: #D8A7A0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
        ${label}
      </td>
      <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); ${bgStyle} color: #F7F2EE; font-size: 14px; line-height: 1.5;">
        ${value || '<span style="opacity: 0.4;">Not Provided</span>'}
      </td>
    </tr>
  `;
}

/**
 * Send Contact Form Email via Resend API
 */
export async function sendContactEmail(data: ContactFormData) {
  const fieldsHtml = `
    ${createFieldRow('Full Name', data.name, true)}
    ${createFieldRow('Email Address', `<a href="mailto:${data.email}" style="color: #E8C8B8; text-decoration: underline;">${data.email}</a>`)}
    ${createFieldRow('Phone Number', data.phone || 'N/A')}
    ${createFieldRow('Subject', data.subject || 'General Enquiry')}
    ${createFieldRow('Message Details', (data.message || '').replace(/\n/g, '<br/>'))}
  `;

  const html = createEmailTemplate('NEW WEBSITE ENQUIRY', 'Contact Form Submission', fieldsHtml);

  const resend = getResendClient();
  return await resend.emails.send({
    from: getSenderEmail(),
    to: [getRecipientEmail()],
    replyTo: data.email, // Enables direct reply to visitor
    subject: `New Website Enquiry: ${data.name} - ${data.subject || 'General Enquiry'}`,
    html,
  });
}

/**
 * Send Free Trial Request Email via Resend API
 */
export async function sendFreeTrialEmail(data: FreeTrialFormData) {
  const fieldsHtml = `
    ${createFieldRow('Full Name', data.name, true)}
    ${createFieldRow('Email Address', `<a href="mailto:${data.email}" style="color: #E8C8B8; text-decoration: underline;">${data.email}</a>`)}
    ${createFieldRow('Phone Number', data.phone)}
    ${createFieldRow('Age', data.age || 'Not specified')}
    ${createFieldRow('Dance Style', data.danceStyle, true)}
    ${createFieldRow('Experience Level', data.experienceLevel)}
    ${createFieldRow('Preferred Class', data.preferredClass || 'Standard Session')}
    ${createFieldRow('Message / Notes', (data.message || 'No additional notes.').replace(/\n/g, '<br/>'))}
  `;

  const html = createEmailTemplate('NEW FREE TRIAL REQUEST', 'Book A Free Trial Submission', fieldsHtml);

  const resend = getResendClient();
  return await resend.emails.send({
    from: getSenderEmail(),
    to: [getRecipientEmail()],
    replyTo: data.email, // Enables direct reply to visitor
    subject: `New Free Trial Request: ${data.name} (${data.danceStyle})`,
    html,
  });
}
