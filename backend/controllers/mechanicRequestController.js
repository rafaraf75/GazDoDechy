const { supabaseAdmin } = require('../supabaseClient');
const cloudinary = require('../config/cloudinaryConfig');

// POST /api/mechanic-requests
exports.createRequest = async (req, res) => {
  const {
    user_id,
    name,
    phone,
    brand,
    model,
    year,
    engine,
    gearbox,
    description,
    image_urls,
    image_public_ids
  } = req.body;

  try {
    const { error } = await supabaseAdmin
      .from('mechanic_requests')
      .insert([{
        user_id,
        name,
        phone,
        brand,
        model,
        year,
        engine,
        gearbox,
        description,
        image_urls,
        image_public_ids
      }]);

    if (error) throw error;

    res.status(201).json({ message: 'Zgłoszenie zapisane!' });
  } catch (err) {
    console.error('Błąd zapisu zgłoszenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/mechanic-requests
exports.getAllRequests = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('mechanic_requests')
      .select('*').eq('is_archived', false);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania wszystkich zgłoszeń:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/mechanic-requests/user/:id
exports.getRequestsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabaseAdmin
      .from('mechanic_requests')
      .select('*')
      .eq('user_id', id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania zgłoszeń:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// DELETE /api/mechanic-requests/:id
exports.deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: request, error: fetchError } = await supabaseAdmin
      .from('mechanic_requests')
      .select('image_public_ids')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Błąd pobierania zgłoszenia:', fetchError);
      return res.status(404).json({ message: 'Nie znaleziono zgłoszenia' });
    }

    const publicIds = JSON.parse(request.image_public_ids || '[]');
    for (const publicId of publicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.warn(`Błąd usuwania zdjęcia ${publicId}:`, cloudErr.message);
      }
    }

    const { error: deleteError } = await supabaseAdmin
      .from('mechanic_requests')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    res.status(200).json({ message: 'Zgłoszenie i zdjęcia usunięte' });
  } catch (err) {
    console.error('Błąd usuwania zgłoszenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// PATCH /api/mechanic-requests/:id/archive
exports.archiveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabaseAdmin
      .from('mechanic_requests')
      .update({ is_archived: true })
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Zgłoszenie zarchiwizowane' });
  } catch (err) {
    console.error('Błąd archiwizacji zgłoszenia:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

// GET /api/mechanic-requests/archived
exports.getArchivedRequests = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('mechanic_requests')
      .select('*')
      .eq('is_archived', true);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania zarchiwizowanych zgłoszeń:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
