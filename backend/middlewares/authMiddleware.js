const { supabaseAdmin } = require('../supabaseClient');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Brak tokena uwierzytelniającego' });
  }

  const token = authHeader.split(' ')[1];

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return res.status(403).json({ message: 'Nieprawidłowy token' });
  }

  req.user = {
    id: user.id,
    email: user.email,
    username: user.user_metadata?.username || user.email,
  };

  next();
};

module.exports = authMiddleware;
