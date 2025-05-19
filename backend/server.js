const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const userStatusRoutes = require('./routes/userStatus');
const adsRoutes = require('./routes/ads');
const categoriesRoutes = require('./routes/categories');
const partTypesRoutes = require('./routes/partTypes');
const imageRoutes = require('./routes/image');
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
app.use('/api/users', userRoutes);
app.use('/api/user-status', userStatusRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/part-types', partTypesRoutes);
app.use('/api/images', imageRoutes);

// Start serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
