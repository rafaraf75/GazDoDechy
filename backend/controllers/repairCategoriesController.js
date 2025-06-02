const { supabaseAdmin } = require('../supabaseClient');

exports.getRepairCategories = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('repair_categories').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania kategorii:', err.message);
    res.status(500).json({ message: 'Błąd serwera przy pobieraniu kategorii' });
  }
};
