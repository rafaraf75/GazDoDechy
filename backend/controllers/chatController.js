const { supabaseAdmin } = require('../supabaseClient');

exports.getChatUsers = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, username');

    if (error) {
      console.error('Błąd pobierania użytkowników do czatu:', error);
      return res.status(500).json({ message: 'Błąd pobierania użytkowników do czatu' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd serwera:', err);
    res.status(500).json({ message: 'Błąd serwera czatu' });
  }
};
