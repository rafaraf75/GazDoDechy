import React, { useState } from 'react';
import axios from 'axios';

const MechanicRequestForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    brand: '',
    model: '',
    year: '',
    engine: '',
    gearbox: '',
    description: '',
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...previewUrls];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

  const handleImageUpload = async () => {
    const uploaded = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('plik', file);
      formData.append('folder', 'mechanic_requests');

      try {
        const res = await axios.post('http://localhost:5000/api/images/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        uploaded.push({
          secure_url: res.data.url,
          public_id: res.data.public_id,
        });
      } catch (err) {
        console.error('Błąd podczas przesyłania zdjęcia:', err);
      }
    }

    return uploaded;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) return alert('Brak ID użytkownika');

    const imageData = await handleImageUpload();
    const secureUrls = imageData.map((d) => d.secure_url);
    const publicIds = imageData.map((d) => d.public_id);

    const payload = {
      ...form,
      user_id: userId,
      image_urls: secureUrls,
      image_public_ids: publicIds,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/mechanic-request', payload);

      if (res.status === 201) {
        // Komunikat informacyjny i callback
        if (onSuccess) onSuccess();

        // Reset formularza
        setForm({
          name: '',
          phone: '',
          brand: '',
          model: '',
          year: '',
          engine: '',
          gearbox: '',
          description: '',
        });
        setImageFiles([]);
        setPreviewUrls([]);
      }
    } catch (err) {
      console.error('Błąd przy zapisie zgłoszenia:', err);
      alert('Nie udało się wysłać zgłoszenia.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Imię lub nick"
        className="w-full p-2 border border-gray-600 rounded dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Telefon (opcjonalnie)"
        className="w-full p-2 border border-gray-600 rounded dark:bg-gray-700 dark:text-white"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Marka"
          className="p-2 border border-gray-600 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          className="p-2 border border-gray-600 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Rok produkcji"
          type="number"
          className="p-2 border border-gray-600 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          name="engine"
          value={form.engine}
          onChange={handleChange}
          placeholder="Silnik"
          className="p-2 border border-gray-600 rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <select
        name="gearbox"
        value={form.gearbox}
        onChange={handleChange}
        className="w-full p-2 border border-gray-600 rounded dark:bg-gray-700 dark:text-white"
      >
        <option value="">Wybierz typ skrzyni</option>
        <option value="manualna">Manualna</option>
        <option value="automatyczna">Automatyczna</option>
      </select>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Opisz problem..."
        className="w-full p-2 border border-gray-600 rounded dark:bg-gray-700 dark:text-white"
        rows="4"
        required
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const newFiles = Array.from(e.target.files);
          const filtered = newFiles.filter((newFile) =>
            !imageFiles.some(
              (existing) => existing.name === newFile.name && existing.size === newFile.size
            )
          );
          const combined = [...imageFiles, ...filtered].slice(0, 3);
          setImageFiles(combined);
          setPreviewUrls(combined.map((file) => URL.createObjectURL(file)));
        }}
        className="text-white"
      />

      {previewUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-white mb-1">Podgląd zdjęć (max 3):</p>
          <div className="flex gap-4 flex-wrap">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative w-32">
                <img src={url} alt={`Podgląd ${idx + 1}`} className="w-full border rounded shadow" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow"
                  title="Usuń zdjęcie"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Wyślij zgłoszenie
      </button>
    </form>
  );
};

export default MechanicRequestForm;
