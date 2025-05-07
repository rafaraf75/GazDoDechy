const { supabase, supabaseAdmin } = require('../supabaseClient');


exports.registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // 1. Tworzenie użytkownika przez Supabase Auth
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

    const userId = data.user.id;

    // 2. Dodanie użytkownika do tabeli "users"
    const { error: insertError } = await supabaseAdmin.from('users').insert([
      {
        id: userId,
        email,
        username,
        role: 'user', // domyślna rola
        profilePicture: '',
        bio: ''
      }
    ]);

    if (insertError) {
      console.error(insertError);
      return res.status(500).json({ message: 'Użytkownik utworzony, ale nie dodano do bazy danych.' });
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
    const user = data.user;

    // Pobieramy dane z tabeli users (w tym role)
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('users')
      .select('username, role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error(profileError);
      return res.status(500).json({ message: 'Nie udało się pobrać danych użytkownika' });
    }

    res.status(200).json({
      message: 'Zalogowano',
      token,
      username: profileData.username,
      role: profileData.role,
      user: data.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd logowania' });
  }
};
