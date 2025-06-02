const { supabaseAdmin } = require('../supabaseClient');

exports.getModelsByBrand = async (req, res) => {
  const { brand_id } = req.query;
  if (!brand_id) return res.status(400).json({ message: 'Brakuje parametru brand_id' });

  try {
    const { data, error } = await supabaseAdmin
      .from('car_models')
      .select('*')
      .eq('brand_id', brand_id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania modeli:', err.message);
    res.status(500).json({ message: 'Błąd serwera przy pobieraniu modeli' });
  }
};
