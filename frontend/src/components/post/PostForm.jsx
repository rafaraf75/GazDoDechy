import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostAdded }) => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const combined = [...images, ...newFiles].slice(0, 3); // max 3 zdjęcia
    setImages(combined);
    setPreviews(combined.map(file => URL.createObjectURL(file)));
    setCurrentIndex(0);
  };

  const handleRemoveImage = (index) => {
    const updated = [...images];
    const updatedPreviews = [...previews];
    updated.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updated);
    setPreviews(updatedPreviews);
    if (currentIndex >= updatedPreviews.length) {
      setCurrentIndex(Math.max(0, updatedPreviews.length - 1));
    }
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
      setCurrentIndex(0);
      alert('Post dodany!');

      if (onPostAdded) {
        onPostAdded(); // 👈 odśwież posty po dodaniu
      }
    } catch (err) {
      console.error('Błąd dodawania posta:', err);
      alert('Nie udało się dodać posta.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Witaj, {localStorage.getItem('username')}! Pochwal się swoim autem
      </h2>
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
          <div className="relative w-full max-w-md mx-auto">
            <img
              src={previews[currentIndex]}
              className="rounded border w-full h-64 object-cover"
              alt={`Podgląd ${currentIndex + 1}`}
            />

            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
              }
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-l"
              disabled={currentIndex === 0}
            >
              ◀
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < previews.length - 1 ? prev + 1 : prev
                )
              }
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-r"
              disabled={currentIndex === previews.length - 1}
            >
              ▶
            </button>

            <button
              type="button"
              onClick={() => handleRemoveImage(currentIndex)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
              title="Usuń zdjęcie"
            >
              ×
            </button>

            <div className="text-center text-xs mt-2 text-gray-500 dark:text-gray-400">
              {currentIndex + 1} / {previews.length}
            </div>
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
