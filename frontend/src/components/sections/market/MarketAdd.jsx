import React, { useState, useEffect } from 'react';
import Layout from '../../common/Layout';
import DashboardSidebar from '../../dashboard/DashboardSidebar';
import axios from 'axios';

const MarketAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
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

  // Usuwanie jednego zdjęcia z podglądu i listy plików
  const handleRemoveImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...previewUrls];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

  // uploaduje każde zdjęcie osobno do Cloudinary
  const handleImageUpload = async () => {
    const uploaded = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('plik', file);
      formData.append('folder', 'ads');

      try {
        const res = await axios.post('http://localhost:5000/api/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        uploaded.push({
          secure_url: res.data.url,
          public_id: res.data.public_id
        });
      } catch (err) {
        console.error('Błąd wysyłania zdjęcia:', err);
      }
    }

    return uploaded;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const userId = localStorage.getItem('userId');
  if (!userId) return alert('Brak ID użytkownika');

  const imageData = await handleImageUpload();
  const secureUrls = imageData.map(d => d.secure_url);
  const publicIds = imageData.map(d => d.public_id);

  const payload = {
    title,
    description,
    category_id: categoryId,
    image_url: secureUrls[0] || null,
    image_urls: JSON.stringify(secureUrls),
    image_public_id: publicIds[0] || null,
    image_public_ids: JSON.stringify(publicIds),
    user_id: userId,
    price: Number(price),
    year: year ? Number(year) : null,
    mileage: mileage ? Number(mileage) : null,
    brand,
    model,
    part_type_id: partTypeId || null,
  };

  try {
    const res = await axios.post('http://localhost:5000/api/ads', payload);

    if (res.status === 201) {
      alert('Ogłoszenie dodane!');
      setTitle('');
      setDescription('');
      setCategoryId('');
      setImageFiles([]);
      setPreviewUrls([]);
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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg  border border-[#b87333] shadow max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Dodaj ogłoszenie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Tytuł"
            className="w-full  border border-[#b87333] p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Opis"
            className="w-full p-2 border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="w-full p-2 border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
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
                className="w-full p-2  border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <input
                type="text"
                placeholder="Model"
                className="w-full p-2 border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
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
                className="w-full p-2 border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <input
                type="number"
                placeholder="Przebieg (km)"
                className="w-full p-2 border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
            </>
          )}

          {selectedCategoryName === 'Części' && (
            <select
              className="w-full p-2 border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
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
              className="w-full p-2  border border-[#b87333] rounded dark:bg-gray-700 dark:text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          )}

          {/* input z możliwością wyboru wielu plików */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const newFiles = Array.from(e.target.files);
              const allFiles = [...imageFiles, ...newFiles].slice(0, 3); // maks. 3
              setImageFiles(allFiles);
              setPreviewUrls(allFiles.map(file => URL.createObjectURL(file)));
            }}
            className="dark:text-white"
          />

          {/* podgląd wielu zdjęć */}
          {previewUrls.length > 0 && (
            <div className="mt-4">
              <p className="text-sm dark:text-white mb-1">Podgląd zdjęć (max 3):</p>
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

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4  border border-[#b87333] rounded hover:bg-green-700"
          >
            Dodaj
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default MarketAdd;
