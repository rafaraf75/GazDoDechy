const { supabaseAdmin } = require('../supabaseClient');

// POST /api/mechanic-replies
exports.createReply = async (req, res) => {
  const { request_id, reply } = req.body;

  if (!request_id || !reply) {
    return res.status(400).json({ message: 'Brakuje danych' });
  }

  try {
    const { error } = await supabaseAdmin
      .from('mechanic_replies')
      .insert([{ request_id, reply }]);

    if (error) throw error;

    res.status(201).json({ message: 'Odpowiedź zapisana' });
  } catch (err) {
    console.error('Błąd przy zapisie odpowiedzi:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/mechanic-replies/:request_id
exports.getReplyByRequest = async (req, res) => {
  const { request_id } = req.params;

  try {
    const { data, error } = await supabaseAdmin
      .from('mechanic_replies')
      .select('*')
      .eq('request_id', request_id)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd przy pobieraniu odpowiedzi:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
