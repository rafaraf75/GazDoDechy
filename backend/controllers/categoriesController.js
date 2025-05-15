const { supabaseAdmin } = require('../supabaseClient');

// GET /api/categories
exports.getAllCategories = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*');

    if (error) {
      console.error('Błąd pobierania kategorii:', error);
      return res.status(500).json({ message: 'Błąd pobierania kategorii' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd serwera:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
