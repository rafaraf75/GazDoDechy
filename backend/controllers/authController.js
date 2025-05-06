const { supabase } = require('../supabaseClient');


exports.registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) {
      console.error(error);
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: 'Użytkownik zarejestrowany', user: data.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera przy rejestracji' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error(error);
      return res.status(400).json({ message: error.message });
    }

    const token = data.session.access_token;

    res.status(200).json({
      message: 'Zalogowano',
      token,
      username: data.user.user_metadata?.username || '',
      user: data.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd logowania' });
  }
};
