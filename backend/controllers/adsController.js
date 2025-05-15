const { supabaseAdmin } = require('../supabaseClient');

// GET /api/ads
exports.getAllAds = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('ads')
      .select('id, title, description, image_url, category_id, user_id, created_at, price, year, mileage');

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania ogłoszeń:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/ads/:id
exports.getAdById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabaseAdmin
      .from('ads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania ogłoszenia:', err);
    res.status(404).json({ message: 'Ogłoszenie nie znalezione' });
  }
};

// POST /api/ads
exports.createAd = async (req, res) => {
  const {
    title,
    description,
    category_id,
    image_url,
    user_id,
    price,
    year,
    mileage,
    brand,
    model,
    part_type_id
    } = req.body;

  try {
    const { error } = await supabaseAdmin
      .from('ads')
      .insert([
        {
            title,
            description,
            category_id,
            image_url,
            user_id,
            price,
            year,
            mileage,
            brand,
            model,
            part_type_id
        }
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'Ogłoszenie dodane' });
  } catch (err) {
    console.error('Błąd dodawania ogłoszenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// PUT /api/ads/:id
exports.updateAd = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    category_id,
    image_url,
    price,
    year,
    mileage
  } = req.body;

  try {
    const { error } = await supabaseAdmin
      .from('ads')
      .update({
        title,
        description,
        category_id,
        image_url,
        price,
        year,
        mileage
      })
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Ogłoszenie zaktualizowane' });
  } catch (err) {
    console.error('Błąd aktualizacji ogłoszenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// DELETE /api/ads/:id
exports.deleteAd = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabaseAdmin.from('ads').delete().eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Ogłoszenie usunięte' });
  } catch (err) {
    console.error('Błąd usuwania ogłoszenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

