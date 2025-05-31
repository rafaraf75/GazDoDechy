const { supabaseAdmin } = require('../supabaseClient');

// POST /api/event-attendance
exports.joinEvent = async (req, res) => {
  const { event_id, user_id } = req.body;

  try {
    const { error } = await supabaseAdmin
      .from('event_attendance')
      .insert([{ event_id, user_id }]);

    if (error) throw error;

    res.status(201).json({ message: 'Dołączono do wydarzenia' });
  } catch (err) {
    console.error('Błąd dołączania:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// DELETE /api/event-attendance
exports.leaveEvent = async (req, res) => {
  const { event_id, user_id } = req.body;

  try {
    const { error } = await supabaseAdmin
      .from('event_attendance')
      .delete()
      .eq('event_id', event_id)
      .eq('user_id', user_id);

    if (error) throw error;

    res.json({ message: 'Opuszczono wydarzenie' });
  } catch (err) {
    console.error('Błąd opuszczania:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/event-attendance/is-attending
exports.checkAttendance = async (req, res) => {
  const { event_id, user_id } = req.query;

  try {
    const { data, error } = await supabaseAdmin
      .from('event_attendance')
      .select('*')
      .eq('event_id', event_id)
      .eq('user_id', user_id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({ isAttending: !!data });
  } catch (err) {
    console.error('Błąd sprawdzania obecności:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
