const { supabaseAdmin } = require('../supabaseClient');

// GET /api/events
exports.getAllEvents = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) return res.status(500).json({ message: 'Błąd pobierania wydarzeń' });
  res.json(data);
};

// GET /api/events/:id
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return res.status(404).json({ message: 'Wydarzenie nie znalezione' });
  res.json(data);
};

// POST /api/events
exports.createEvent = async (req, res) => {
  const { title, description, location, date, created_by } = req.body;

  const { error } = await supabaseAdmin
    .from('events')
    .insert([{ title, description, location, date, created_by }]);

  if (error) return res.status(500).json({ message: 'Błąd tworzenia wydarzenia' });
  res.status(201).json({ message: 'Wydarzenie utworzone' });
};

// POST /api/events/:id/attend
exports.joinEvent = async (req, res) => {
  const { id } = req.params; // event_id
  const { user_id } = req.body;

  const { error } = await supabaseAdmin
    .from('event_attendees')
    .insert([{ event_id: id, user_id }]);

  if (error) return res.status(500).json({ message: 'Błąd dołączania do wydarzenia' });
  res.status(201).json({ message: 'Zapisano na wydarzenie' });
};

// GET /api/events/:id/is-attending?user_id=...
exports.isAttending = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  const { data, error } = await supabaseAdmin
    .from('event_attendees')
    .select('*')
    .eq('event_id', id)
    .eq('user_id', user_id)
    .single();

  if (error && error.code !== 'PGRST116') {
    return res.status(500).json({ message: 'Błąd sprawdzania uczestnictwa' });
  }

  res.json({ isAttending: !!data });
};

// DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    // Najpierw usuń uczestników tego wydarzenia
    await supabaseAdmin
      .from('event_attendees')
      .delete()
      .eq('event_id', id);

    // Następnie samo wydarzenie
    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Wydarzenie zostało usunięte' });
  } catch (err) {
    console.error('Błąd usuwania wydarzenia:', err);
    res.status(500).json({ message: 'Błąd serwera przy usuwaniu wydarzenia' });
  }
};
