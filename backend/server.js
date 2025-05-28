const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const userStatusRoutes = require('./routes/userStatus');
const adsRoutes = require('./routes/ads');
const categoriesRoutes = require('./routes/categories');
const partTypesRoutes = require('./routes/partTypes');
const imageRoutes = require('./routes/image');
const chatRoutes = require('./routes/chat');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comments');
const reactionRoutes = require('./routes/reactions');
const heroRoutes = require('./routes/hero');
const groupRoutes = require('./routes/group');
const groupMembersRoutes = require('./routes/groupMembers');

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const onlineUsers = new Map();
require('dotenv').config(); // wczytuje zmienne z .env

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO – logowanie połączeń
io.on('connection', (socket) => {
  console.log(' Socket.IO: użytkownik połączony – ' + socket.id);

  // Oczekujemy, że frontend zaraz po połączeniu wyśle swoje userId
  socket.on('user_connected', (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(` Użytkownik ${userId} połączony.`);

    // Aktualizacja dla wszystkich
    io.emit('users_online', Array.from(onlineUsers.keys()));
  });

  socket.on('disconnect', () => {
    for (const [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        console.log(` Użytkownik ${userId} rozłączony.`);
        break;
      }
    }

    io.emit('users_online', Array.from(onlineUsers.keys()));
  });
});

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
app.use('/api/chat', chatRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/group-members', groupMembersRoutes);

// Start serwera
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
