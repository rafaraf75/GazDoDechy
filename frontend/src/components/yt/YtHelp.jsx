import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YtHelp = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState({ brand_id: '', model_id: '', category_id: '' });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [b, c] = await Promise.all([
        axios.get('http://localhost:5000/api/brands'),
        axios.get('http://localhost:5000/api/repair-categories')
      ]);
      setBrands(b.data);
      setCategories(c.data);
    } catch (err) {
      console.error('Błąd pobierania danych:', err);
    }
  };

  const handleBrandChange = async (e) => {
    const brand_id = e.target.value;
    setSelected({ ...selected, brand_id, model_id: '' });
    try {
      const res = await axios.get(`http://localhost:5000/api/models`, {
      params: { brand_id }
    });
      setModels(res.data);
    } catch (err) {
      console.error('Błąd pobierania modeli:', err);
    }
  };

  const handleChange = (e) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const { brand_id, model_id, category_id } = selected;
    if (!brand_id || !model_id || !category_id) return;

    setLoading(true);
    setError(null);
    setVideos([]);

    try {
      const { data: keywordData } = await axios.get('http://localhost:5000/api/yt-help/keyword', {
        params: { brand_id, model_id, category_id }
      });

      const { data: ytVideos } = await axios.get(`http://localhost:5000/api/yt-help/search/${encodeURIComponent(keywordData.query)}`);
      setVideos(ytVideos);
    } catch (err) {
      console.error('Błąd podczas wyszukiwania:', err);
      setError('Nie udało się pobrać filmów.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Porady wideo z YouTube</h2>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <select
          name="brand_id"
          value={selected.brand_id}
          onChange={handleBrandChange}
          className="p-2 border border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">Wybierz markę</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <select
          name="model_id"
          value={selected.model_id}
          onChange={handleChange}
          className="p-2 border border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">Wybierz model</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <select
          name="category_id"
          value={selected.category_id}
          onChange={handleChange}
          className="p-2 border border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">Wybierz kategorię</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 border border-[#b87333] text-white px-4 py-2 rounded mb-6"
      >
        {loading ? 'Szukam...' : 'Szukaj'}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video, idx) => (
          <div key={idx} onClick={() => setActiveVideo(video.videoId)} className="cursor-pointer">
            <img src={video.thumbnail} alt={video.title} className="w-full border border-[#b87333] rounded shadow" />
            <p className="mt-1 text-sm dark:text-white">{video.title}</p>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-full max-w-4xl bg-black relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}`}
              title="Porada wideo"
              className="w-full h-[60vh]"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default YtHelp;
