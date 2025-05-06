const authRoutes = require('./routes/auth');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // wczytuje zmienne z .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Testowy endpoint
app.get('/', (req, res) => {
  res.send('GazDoDechy backend działa!');
});

// Trasy API
app.use('/api/auth', authRoutes);

// Start serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
