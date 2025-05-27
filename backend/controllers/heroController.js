const { supabaseAdmin } = require('../supabaseClient');
const cloudinary = require('../config/cloudinaryConfig');

// GET /api/hero/:slug
exports.getHeroBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const { data, error } = await supabaseAdmin
      .from('hero_sections')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Hero nie znaleziony' });
    }

    res.json(data);
  } catch (err) {
    console.error('Błąd ładowania hero:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// POST /api/hero
exports.createHero = async (req, res) => {
  const { page, heading, subheading } = req.body;
  const file = req.file;

  try {
    if (!file) return res.status(400).json({ message: 'Brak pliku' });

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'hero',
    });

    const { data, error } = await supabaseAdmin
      .from('hero_sections')
      .insert([{
        slug: page,
        heading,
        subheading,
        image_url: result.secure_url,
        image_public_id: result.public_id,
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error('Błąd tworzenia hero:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// POST /api/hero-upload
exports.uploadHeroImage = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Brak pliku do przesłania' });
  }

  try {
    const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      folder: 'hero'
    });

    res.status(201).json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (err) {
    console.error('Błąd przesyłania do Cloudinary:', err);
    res.status(500).json({ message: 'Błąd serwera podczas przesyłania zdjęcia' });
  }
};

// PUT /api/hero/:id
exports.updateHero = async (req, res) => {
  const { id } = req.params;
  const { heading, subheading } = req.body;
  const file = req.file;

  try {
    let updatedData = { heading, subheading };

    if (file) {
      // 1. Pobierz starego herosa, by usunąć stary obrazek
      const { data: oldHero, error: fetchError } = await supabaseAdmin
        .from('hero_sections')
        .select('image_public_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // 2. Usuń stary obrazek z Cloudinary (jeśli istnieje)
      if (oldHero?.image_public_id) {
        await cloudinary.uploader.destroy(oldHero.image_public_id);
      }

      // 3. Prześlij nowy obrazek
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        { folder: 'hero' }
      );

      // 4. Uzupełnij dane do aktualizacji
      updatedData.image_url = result.secure_url;
      updatedData.image_public_id = result.public_id;
    }

    // 5. Zaktualizuj rekord w Supabase
    const { data, error } = await supabaseAdmin
      .from('hero_sections')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Błąd aktualizacji hero:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// DELETE /api/hero/:id
exports.deleteHero = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: hero } = await supabaseAdmin
      .from('hero_sections')
      .select('image_public_id')
      .eq('id', id)
      .single();

    if (hero?.image_public_id) {
      await cloudinary.uploader.destroy(hero.image_public_id);
    }

    const { error } = await supabaseAdmin
      .from('hero_sections')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Sekcja hero usunięta' });
  } catch (err) {
    console.error('Błąd usuwania hero:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
