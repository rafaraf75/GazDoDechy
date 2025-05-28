const { supabaseAdmin } = require('../supabaseClient');

// POST /api/group-members
exports.joinGroup = async (req, res) => {
  const { group_id, user_id } = req.body;

  try {
    const { error } = await supabaseAdmin
      .from('group_members')
      .insert([{ group_id, user_id }]);

    if (error) throw error;

    res.status(201).json({ message: 'Dołączono do grupy' });
  } catch (err) {
    console.error('Błąd dołączania do grupy:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/group-members/is-member?group_id=...&user_id=...
exports.checkMembership = async (req, res) => {
  const { group_id, user_id } = req.query;

  try {
    const { data, error } = await supabaseAdmin
      .from('group_members')
      .select('*')
      .eq('group_id', group_id)
      .eq('user_id', user_id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // 'No rows found'

    res.json({ isMember: !!data });
  } catch (err) {
    console.error('Błąd sprawdzania członkostwa:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

