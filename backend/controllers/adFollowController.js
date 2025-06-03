const { supabaseAdmin } = require('../supabaseClient');

// controllers/adFollowController.js

exports.followAd = async (req, res) => {
  const { userId, adId } = req.body;

  // SPRAWDŹ CZY JUŻ ISTNIEJE
  const { data: existing, error: checkError } = await supabaseAdmin
    .from('ad_followers')
    .select('id')
    .eq('user_id', userId)
    .eq('ad_id', adId)
    .maybeSingle(); // nie rzuci błędu przy braku wyników

  if (checkError) return res.status(500).json({ message: 'Błąd sprawdzania relacji.' });
  if (existing) return res.status(409).json({ message: 'Już obserwujesz to ogłoszenie.' });

  // Jeśli nie istnieje – dodaj
  const { error } = await supabaseAdmin
    .from('ad_followers')
    .insert([{ user_id: userId, ad_id: adId }]);

  if (error) return res.status(500).json({ message: 'Nie udało się dodać do obserwowanych.' });
  res.status(200).json({ message: 'Dodano do obserwowanych.' });
};

exports.unfollowAd = async (req, res) => {
  const { userId, adId } = req.body;
  const { error } = await supabaseAdmin.from('ad_followers').delete().eq('user_id', userId).eq('ad_id', adId);

  if (error) return res.status(500).json({ message: 'Nie udało się usunąć z obserwowanych.' });
  res.status(200).json({ message: 'Usunięto z obserwowanych.' });
};

exports.getFollowedAdsByUser = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabaseAdmin
    .from('ad_followers')
    .select('ad_id')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ message: 'Błąd pobierania obserwowanych ogłoszeń.' });

  const adIds = data.map(row => row.ad_id);
  if (adIds.length === 0) return res.status(200).json([]);

  const { data: ads, error: adsError } = await supabaseAdmin
    .from('ads')
    .select('*')
    .in('id', adIds);

  if (adsError) return res.status(500).json({ message: 'Błąd pobierania danych ogłoszeń.' });

  res.status(200).json(ads);
};
