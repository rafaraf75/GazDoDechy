const { supabaseAdmin } = require('../supabaseClient');
const cloudinary = require('../config/cloudinaryConfig');

// GET /api/ads
exports.getAllAds = async (req, res) => {
  const {
    category,
    brand,
    model,
    year,
    priceMax,
    title,
    part_type_id
  } = req.query;

  try {
    let query = supabaseAdmin
      .from('ads')
      .select(`
        id,
        title,
        description,
        image_url,
        image_urls,
        category_id,
        user_id,
        created_at,
        price,
        year,
        mileage,
        brand,
        model,
        part_type_id
      `);

    // Filtrowanie
    if (category) {
      query = query.eq('category_id', mapCategoryNameToId(category));
    }

    if (brand) {
      query = query.ilike('brand', `%${brand}%`);
    }

    if (model) {
      query = query.ilike('model', `%${model}%`);
    }

    if (year) {
      query = query.eq('year', Number(year));
    }

    if (priceMax) {
      query = query.lte('price', Number(priceMax));
    }

    if (title) {
      query = query.ilike('title', `%${title}%`);
    }

    if (part_type_id) {
      query = query.eq('part_type_id', Number(part_type_id));
    }

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania ogłoszeń:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// Mapowanie nazw kategorii na ID
function mapCategoryNameToId(name) {
  const map = {
    'Samochody': 1,
    'Motocykle': 2,
    'Części': 3,
    'Narzędzia': 4
  };
  return map[name] || null;
}

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
    image_urls,
    image_public_ids,
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
      .insert([{
        title,
        description,
        category_id,
        image_url,
        image_urls,
        image_public_ids,
        user_id,
        price,
        year,
        mileage,
        brand,
        model,
        part_type_id
      }]);

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
    image_urls,
    image_public_ids,
    image_public_id,
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
        image_urls,
        image_public_ids,
        image_public_id,
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

// GET /api/ads/user/:id
exports.getAdsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabaseAdmin
      .from('ads')
      .select('*')
      .eq('user_id', id);

    if (error) {
      console.error('Błąd pobierania ogłoszeń użytkownika:', error);
      return res.status(500).json({ message: 'Błąd serwera' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd serwera:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// DELETE /api/ads/:id
exports.deleteAd = async (req, res) => {
  const { id } = req.params;

  try {
    // Pobierz dane ogłoszenia (żeby mieć public_ids)
    const { data: ad, error: fetchError } = await supabaseAdmin
      .from('ads')
      .select('image_public_ids')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Błąd pobierania ogłoszenia:', fetchError);
      return res.status(404).json({ message: 'Nie znaleziono ogłoszenia' });
    }

    // Usuń zdjęcia z Cloudinary
    const publicIds = JSON.parse(ad.image_public_ids || '[]');
    for (const publicId of publicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.warn(`Nie udało się usunąć zdjęcia Cloudinary: ${publicId}`, cloudErr.message);
      }
    }

    // Usuń wpis z Supabase
    const { error: deleteError } = await supabaseAdmin
      .from('ads')
      .delete()
      .eq('id', id);

    if (deleteError) {
      throw deleteError;
    }

    res.status(200).json({ message: 'Ogłoszenie i zdjęcia usunięte' });
  } catch (err) {
    console.error('Błąd usuwania ogłoszenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
