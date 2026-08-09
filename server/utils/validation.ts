export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate Email Format using RFC 5322 pattern
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate Contact Form Payload
 */
export function validateContactForm(body: any): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Malformed request body.' };
  }

  // Anti-spam Honeypot Check
  if (body.website || body.honeypot) {
    return { isValid: false, error: 'Spam detected.' };
  }

  const { name, email, message } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required.' };
  }

  if (name.length > 100) {
    return { isValid: false, error: 'Name is too long (max 100 characters).' };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Please provide a valid email address.' };
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { isValid: false, error: 'Message is required.' };
  }

  if (message.length < 5) {
    return { isValid: false, error: 'Message must be at least 5 characters long.' };
  }

  if (message.length > 3000) {
    return { isValid: false, error: 'Message is too long (max 3000 characters).' };
  }

  return { isValid: true };
}

/**
 * Validate Free Trial Form Payload
 */
export function validateFreeTrialForm(body: any): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Malformed request body.' };
  }

  // Anti-spam Honeypot Check
  if (body.website || body.honeypot) {
    return { isValid: false, error: 'Spam detected.' };
  }

  const { name, email, phone, danceStyle, experienceLevel } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { isValid: false, error: 'Full Name is required.' };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Please provide a valid email address.' };
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required.' };
  }

  if (!danceStyle || typeof danceStyle !== 'string' || danceStyle.trim().length === 0) {
    return { isValid: false, error: 'Please select a Dance Style.' };
  }

  if (!experienceLevel || typeof experienceLevel !== 'string' || experienceLevel.trim().length === 0) {
    return { isValid: false, error: 'Please select an Experience Level.' };
  }

  if (body.message && typeof body.message === 'string' && body.message.length > 3000) {
    return { isValid: false, error: 'Message is too long (max 3000 characters).' };
  }

  return { isValid: true };
}
