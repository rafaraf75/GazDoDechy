const { supabaseAdmin } = require('../supabaseClient');

exports.getBrands = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('car_brands').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania marek:', err.message);
    res.status(500).json({ message: 'Błąd serwera przy pobieraniu marek' });
  }
};
