import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ onEventAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', formData);
      setFormData({ title: '', description: '', date: '' });
      if (onEventAdded) onEventAdded();
      alert('Wydarzenie dodane!');
    } catch (err) {
      console.error('Błąd dodawania wydarzenia:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <input
        type="text"
        name="title"
        placeholder="Tytuł wydarzenia"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      <textarea
        name="description"
        placeholder="Opis wydarzenia"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Dodaj wydarzenie
      </button>
    </form>
  );
};

export default EventForm;
