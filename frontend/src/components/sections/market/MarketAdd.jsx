import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import DashboardSidebar from '../../DashboardSidebar';
import axios from 'axios';

const MarketAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [partTypeId, setPartTypeId] = useState('');
  const [categories, setCategories] = useState([]);
  const [partTypes, setPartTypes] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data || []);
      } catch (err) {
        console.error('Błąd pobierania kategorii:', err);
      }
    };

    const fetchPartTypes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/part-types');
        setPartTypes(res.data || []);
      } catch (err) {
        console.error('Błąd pobierania typów części:', err);
      }
    };

    fetchCategories();
    fetchPartTypes();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    setCategoryId(selectedId);

    const selectedCategory = categories.find((cat) => cat.id.toString() === selectedId);
    setSelectedCategoryName(selectedCategory?.name || '');
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append('plik', imageFile);
    formData.append('folder', 'ads');

    try {
          const res = await axios.post('http://localhost:5000/api/images/upload', formData, {
          headers: {
        'Content-Type': 'multipart/form-data'
        },
      });
      return res.data.url;
    } catch (err) {
      console.error('Błąd wysyłania zdjęcia:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) return alert('Brak ID użytkownika');

    const imageUrl = await handleImageUpload();

    try {
      const res = await axios.post('http://localhost:5000/api/ads', {
        title,
        description,
        category_id: categoryId,
        image_url: imageUrl,
        user_id: userId,
        price: Number(price),
        year: year ? Number(year) : null,
        mileage: mileage ? Number(mileage) : null,
        brand,
        model,
        part_type_id: partTypeId || null,
      });

      if (res.status === 201) {
        alert('Ogłoszenie dodane!');
        // Reset
        setTitle('');
        setDescription('');
        setCategoryId('');
        setImageFile(null);
        setPrice('');
        setYear('');
        setMileage('');
        setBrand('');
        setModel('');
        setPartTypeId('');
      }
    } catch (err) {
      console.error('Błąd dodawania ogłoszenia:', err);
      alert('Wystąpił błąd przy dodawaniu ogłoszenia.');
    }
  };

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Dodaj ogłoszenie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Tytuł"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Opis"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={categoryId}
            onChange={handleCategoryChange}
            required
          >
            <option value="">-- Wybierz kategorię --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {(selectedCategoryName === 'Samochody' || selectedCategoryName === 'Motocykle' || selectedCategoryName === 'Części') && (
            <>
              <input
                type="text"
                placeholder="Marka"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <input
                type="text"
                placeholder="Model"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </>
          )}

          {(selectedCategoryName === 'Samochody' || selectedCategoryName === 'Motocykle') && (
            <>
              <input
                type="number"
                placeholder="Rok produkcji"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <input
                type="number"
                placeholder="Przebieg (km)"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
            </>
          )}

          {selectedCategoryName === 'Części' && (
            <select
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={partTypeId}
              onChange={(e) => setPartTypeId(e.target.value)}
            >
              <option value="">-- Wybierz typ części --</option>
              {partTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          )}

          {selectedCategoryName !== '' && (
            <input
              type="number"
              placeholder="Cena (zł)"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="dark:text-white"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Dodaj
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default MarketAdd;
