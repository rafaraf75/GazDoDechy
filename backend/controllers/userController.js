const { supabaseAdmin } = require('../supabaseClient');

// GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, email, username, role, isBlocked');

    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Błąd pobierania użytkowników' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/users/full
exports.getAllUsersWithStatus = async (req, res) => {
  try {
    // Pobierz użytkowników
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id, email, username, role');

    if (usersError) {
      console.error('Błąd pobierania użytkowników:', usersError);
      return res.status(500).json({ message: 'Błąd pobierania użytkowników' });
    }

    // Pobierz statusy
    const { data: statuses, error: statusError } = await supabaseAdmin
      .from('user_status')
      .select('user_id, is_blocked');

    if (statusError) {
      console.error('Błąd pobierania statusów:', statusError);
      return res.status(500).json({ message: 'Błąd pobierania statusów' });
    }

    // Połącz dane
    const combined = users.map(user => {
      const status = statuses.find(s => s.user_id === user.id);
      return {
        ...user,
        isBlocked: status ? status.is_blocked : false // false domyślnie, jeśli brak wpisu
      };
    });

    res.status(200).json(combined);
  } catch (err) {
    console.error('Błąd serwera:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('username, email, role, bio, profilePicture')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera przy pobieraniu danych użytkownika' });
  }
};

// PUT /api/users/:id
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, bio, profilePicture } = req.body;

  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ username, bio, profilePicture })
      .eq('id', id);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Błąd aktualizacji profilu' });
    }

    res.status(200).json({ message: 'Profil zaktualizowany' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera przy aktualizacji' });
  }
};
