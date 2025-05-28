const { supabaseAdmin } = require('../supabaseClient');

// GET /api/hero
exports.getAllHeros = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('hero_sections')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Błąd pobierania wszystkich hero:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

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
  const { slug, title, subtitle } = req.body;

  try {
    const { data, error } = await supabaseAdmin
      .from('hero_sections')
      .insert([{
        slug,
        title,
        subtitle
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

// PUT /api/hero/:id
exports.updateHero = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle } = req.body;

  try {
    const { data, error } = await supabaseAdmin
      .from('hero_sections')
      .update({
        title,
        subtitle
      })
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