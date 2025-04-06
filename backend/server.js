const authRoutes = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
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

// Połączenie z MongoDB i start serwera
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Połączono z MongoDB Atlas');
    app.use('/api/auth', authRoutes);
    app.listen(PORT, () => {
      console.log(`Serwer działa na porcie ${PORT}`);
    });
  })

  .catch((err) => console.error('Błąd połączenia z MongoDB:', err));
