const { supabaseAdmin } = require('../supabaseClient');

// GET /api/yt-help/keyword?brand_id=...&model_id=...&category_id=...
exports.getKeyword = async (req, res) => {
  const { brand_id, model_id, category_id } = req.query;

  try {
    const { data, error } = await supabaseAdmin
      .from('repair_keywords')
      .select('keyword, query')
      .eq('brand_id', brand_id)
      .eq('model_id', model_id)
      .eq('category_id', category_id)
      .limit(1)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Błąd pobierania keyworda:', err.message);
    res.status(500).json({ message: 'Nie udało się pobrać frazy do wyszukiwania' });
  }
};

const axios = require('axios');

exports.searchYoutube = async (req, res) => {
  const { query } = req.params;

  try {
    const ytRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        q: query,
        part: 'snippet',
        maxResults: 6,
        type: 'video',
        channelId: 'UC0GTP1z4q37R3lOZ6QzM5Pw'
      }
    });

    const videos = ytRes.data.items.map(item => ({
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      videoId: item.id.videoId
    }));

    res.status(200).json(videos);
  } catch (err) {
    console.error('Błąd pobierania filmów z YouTube:', err.message);
    res.status(500).json({ message: 'Nie udało się pobrać filmów z YouTube' });
  }
};
