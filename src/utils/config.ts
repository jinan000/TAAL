/**
 * Centralized API base URL configuration.
 *
 * In development: VITE_API_URL is empty or http://localhost:3001
 *   → Vite proxy forwards /api/* to the local Express server.
 *
 * In production: VITE_API_URL = https://your-vercel-deployment.vercel.app
 *   → Frontend on Bluehost calls the Vercel-hosted API directly.
 *
 * VITE_API_URL is safe to expose — it is just a public URL.
 * RESEND_API_KEY is NEVER a VITE_ variable and stays server-side only.
 */
export const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, '') ?? '';
