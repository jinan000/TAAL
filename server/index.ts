import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[TAAL API Server] Running on http://localhost:${PORT}`);
  console.log(`[TAAL API Server] Destination Email: ${process.env.RECIPIENT_EMAIL || 'infoattaaldanceacademy@gmail.com'}`);
});
