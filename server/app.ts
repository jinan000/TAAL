import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { validateContactForm, validateFreeTrialForm } from './utils/validation.js';
import { sendContactEmail, sendFreeTrialEmail } from './services/emailService.js';

dotenv.config();

const app = express();

// Strict CORS Policy Configuration
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (like curl or postman) or all origins in dev
    if (!origin || !isProduction) {
      return callback(null, true);
    }
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('taaldanceacademy.ca')
    ) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Access denied for this origin.'));
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' })); // Body size limit to prevent memory payloads

// Rate limiting — Max 15 submissions per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP address. Please try again after 15 minutes.',
  },
});

app.use('/api/', apiLimiter);

/**
 * POST /api/contact — Contact Form Submission
 */
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateContactForm(req.body);

    if (!validation.isValid) {
      res.status(400).json({ success: false, error: validation.error });
      return;
    }

    const { name, email, phone, subject, message } = req.body;

    const result = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      subject: subject ? subject.trim() : undefined,
      message: message.trim(),
    });

    if (result.error) {
      console.error('[Resend Contact Error]:', result.error);
      res.status(500).json({
        success: false,
        error: 'Unable to send your request. Please try again or contact us directly.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! The TAAL team will get back to you shortly.',
    });
  } catch (error) {
    console.error('[POST /api/contact Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred. Please try again later.',
    });
  }
});

/**
 * POST /api/free-trial — Book A Free Trial Submission
 */
app.post('/api/free-trial', async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateFreeTrialForm(req.body);

    if (!validation.isValid) {
      res.status(400).json({ success: false, error: validation.error });
      return;
    }

    const { name, email, phone, age, danceStyle, experienceLevel, preferredClass, message } = req.body;

    const result = await sendFreeTrialEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      age: age ? age.trim() : undefined,
      danceStyle: danceStyle.trim(),
      experienceLevel: experienceLevel.trim(),
      preferredClass: preferredClass ? preferredClass.trim() : undefined,
      message: message ? message.trim() : undefined,
    });

    if (result.error) {
      console.error('[Resend Free Trial Error]:', result.error);
      res.status(500).json({
        success: false,
        error: 'Unable to send your request. Please try again or contact us directly.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Your free trial request has been received! The TAAL team will get back to you shortly.',
    });
  } catch (error) {
    console.error('[POST /api/free-trial Error]:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred. Please try again later.',
    });
  }
});

// Centralized error handler — Ensures no stack traces or secrets are leaked to browser
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Server Error]:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error.',
  });
});

export default app;
