const { supabaseAdmin } = require('../supabaseClient');

// GET /api/part-types
exports.getAllPartTypes = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('part_types')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania typów części:', err);
    res.status(500).json({ message: 'Błąd serwera przy pobieraniu typów części' });
  }
};
