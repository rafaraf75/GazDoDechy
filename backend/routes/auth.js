const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Rejestracja użytkownika
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Sprawdź czy użytkownik już istnieje
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email już istnieje' });

    // Haszuj hasło
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tworzenie nowego użytkownika
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera przy rejestracji' });
  }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'Użytkownik nie istnieje' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Nieprawidłowe hasło' });

      // TWORZENIE TOKENA
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      // Zwracamy dane + token
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        token: token
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Błąd logowania' });
    }
  });


module.exports = router;
