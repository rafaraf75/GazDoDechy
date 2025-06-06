require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { supabaseAdmin } = require('./supabaseClient');
// Importy tras
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
const eventRoutes = require('./routes/events');
const eventAttendanceRoutes = require('./routes/eventAttendance');
const mechanicRequestRoute = require('./routes/mechanicRequest');
const mechanicReplyRoutes = require('./routes/mechanicReplies');
const ytHelpRoutes = require('./routes/ytHelp');
const brandRoutes = require('./routes/brands');
const modelRoutes = require('./routes/models');
const repairCategoryRoutes = require('./routes/repairCategories');
const adFollowRoutes = require('./routes/adFollow');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const onlineUsers = new Map();

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO
io.on('connection', (socket) => {
  console.log('Socket.IO: użytkownik połączony –', socket.id);

  let currentUserId = null;

  socket.on('user_connected', async (userId) => {
    currentUserId = userId;
    onlineUsers.set(userId, socket.id);
    console.log(`Użytkownik ${userId} połączony.`);

    const { error } = await supabaseAdmin
      .from('online_status')
      .upsert({
        user_id: userId,
        is_online: true,
        last_active: new Date().toISOString(),
      });

    if (error) {
      console.error('Błąd upsert online_status:', error.message);
    }

    io.emit('users_online', Array.from(onlineUsers.keys()));
  });

  socket.on('user_disconnected', async (userId) => {
  onlineUsers.delete(userId);
  console.log(`Użytkownik ${userId} wylogował się ręcznie.`);

  const { error } = await supabaseAdmin
    .from('online_status')
    .update({
      is_online: false,
      last_active: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Błąd aktualizacji online_status przy wylogowaniu:', error.message);
  }

  io.emit('users_online', Array.from(onlineUsers.keys()));
  });
});

// Testowy endpoint
app.get('/', (req, res) => {
  res.send('GazDoDechy backend działa!');
});

// API endpoints
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
app.use('/api/events', eventRoutes);
app.use('/api/event-attendance', eventAttendanceRoutes);
app.use('/api/mechanic-request', mechanicRequestRoute);
app.use('/api/mechanic-replies', mechanicReplyRoutes);
app.use('/api/yt-help', ytHelpRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/repair-categories', repairCategoryRoutes);
app.use('/api/followed-ads', adFollowRoutes);

// Start serwera
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
