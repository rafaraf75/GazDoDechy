const { supabaseAdmin } = require('../supabaseClient');

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
