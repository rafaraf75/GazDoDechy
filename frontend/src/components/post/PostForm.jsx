import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // max 3 zdjęcia
    setImages(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleRemoveImage = (index) => {
    const updated = [...images];
    const updatedPreviews = [...previews];
    updated.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updated);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() && images.length === 0) {
      alert('Post musi zawierać opis lub zdjęcia.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('user_id', localStorage.getItem('userId'));

    images.forEach((file) => {
      formData.append('images', file);
    });

    try {
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setDescription('');
      setImages([]);
      setPreviews([]);
      alert('Post dodany!');
    } catch (err) {
      console.error('Błąd dodawania posta:', err);
      alert('Nie udało się dodać posta.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Dodaj post</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Opisz swoje auto, tuning, trasę..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="dark:text-white"
        />

        {previews.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {previews.map((src, idx) => (
              <div key={idx} className="relative w-24">
                <img src={src} className="rounded border w-full h-16 object-cover" alt="preview" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
