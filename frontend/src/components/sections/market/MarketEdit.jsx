import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../common/Layout';
import DashboardSidebar from '../../dashboard/DashboardSidebar';

const MarketEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [partTypes, setPartTypes] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    year: '',
    mileage: '',
    brand: '',
    model: '',
    part_type_id: '',
    image_urls: [],
    image_public_ids: []
  });

  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [previewUrls, setPreviewUrls] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`http://localhost:5000/api/ads/${id}`);
      const categoriesRes = await axios.get('http://localhost:5000/api/categories');
      const partsRes = await axios.get('http://localhost:5000/api/part-types');

      setCategories(categoriesRes.data || []);
      setPartTypes(partsRes.data || []);
      const ad = res.data;

      setFormData({
        ...ad,
        image_urls: JSON.parse(ad.image_urls || '[]'),
        image_public_ids: JSON.parse(ad.image_public_ids || '[]')
      });
      setPreviewUrls(JSON.parse(ad.image_urls || '[]'));

      const selectedCat = categoriesRes.data.find(cat => cat.id === ad.category_id);
      setSelectedCategoryName(selectedCat?.name || '');
    };
    load();
  }, [id]);

  const handleRemoveImage = (index) => {
    const updatedUrls = [...formData.image_urls];
    const updatedIds = [...formData.image_public_ids];
    updatedUrls.splice(index, 1);
    updatedIds.splice(index, 1);
    setFormData({ ...formData, image_urls: updatedUrls, image_public_ids: updatedIds });
    setPreviewUrls(updatedUrls);
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const uploadNewImages = async () => {
    const uploaded = [];

    for (const file of newImages) {
      const formData = new FormData();
      formData.append('plik', file);
      formData.append('folder', 'ads');

      const res = await axios.post('http://localhost:5000/api/images/upload', formData);
      uploaded.push({
        secure_url: res.data.url,
        public_id: res.data.public_id
      });
    }

    return uploaded;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'category_id') {
      const selectedCat = categories.find(cat => cat.id.toString() === value);
      setSelectedCategoryName(selectedCat?.name || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let additionalImages = [];
    if (newImages.length > 0) {
      additionalImages = await uploadNewImages();
    }

    const updatedUrls = [
      ...formData.image_urls,
      ...additionalImages.map(img => img.secure_url)
    ];
    const updatedPublicIds = [
      ...formData.image_public_ids,
      ...additionalImages.map(img => img.public_id)
    ];

    const payload = {
      ...formData,
      image_urls: JSON.stringify(updatedUrls),
      image_public_ids: JSON.stringify(updatedPublicIds),
      price: Number(formData.price),
      year: formData.year ? Number(formData.year) : null,
      mileage: formData.mileage ? Number(formData.mileage) : null
    };

    await axios.put(`http://localhost:5000/api/ads/${id}`, payload);
    alert('Zaktualizowano ogłoszenie');
    navigate('/user/ads');
  };

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded  border border-[#b87333] shadow text-gray-900 dark:text-gray-100">
        <h1 className="text-xl font-bold mb-4">Edytuj ogłoszenie</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={formData.title} onChange={handleChange}
            placeholder="Tytuł" className="w-full p-2 rounded  border border-[#b87333] bg-gray-100 dark:bg-gray-700" />

          <textarea name="description" value={formData.description} onChange={handleChange}
            placeholder="Opis" className="w-full p-2 rounded  border border-[#b87333] bg-gray-100 dark:bg-gray-700" />

          <select name="category_id" value={formData.category_id} onChange={handleChange}
            className="w-full p-2 rounded  border border-[#b87333] bg-gray-100 dark:bg-gray-700">
            <option value="">-- Wybierz kategorię --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {(selectedCategoryName === 'Samochody' || selectedCategoryName === 'Motocykle' || selectedCategoryName === 'Części') && (
            <>
              <input name="brand" value={formData.brand} onChange={handleChange}
                placeholder="Marka" className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
              <input name="model" value={formData.model} onChange={handleChange}
                placeholder="Model" className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            </>
          )}

          {(selectedCategoryName === 'Samochody' || selectedCategoryName === 'Motocykle') && (
            <>
              <input name="year" type="number" value={formData.year || ''} onChange={handleChange}
                placeholder="Rok" className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
              <input name="mileage" type="number" value={formData.mileage || ''} onChange={handleChange}
                placeholder="Przebieg (km)" className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
            </>
          )}

          {selectedCategoryName === 'Części' && (
            <select name="part_type_id" value={formData.part_type_id || ''} onChange={handleChange}
              className="w-full p-2 rounded  border border-[#b87333] bg-gray-100 dark:bg-gray-700">
              <option value="">-- Wybierz typ części --</option>
              {partTypes.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}

          <input name="price" type="number" value={formData.price} onChange={handleChange}
            placeholder="Cena" className="w-full p-2 rounded  border border-[#b87333] bg-gray-100 dark:bg-gray-700" />

          <input type="file" multiple accept="image/*" onChange={handleNewImages} className="dark:text-white" />

          {previewUrls.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {previewUrls.map((url, idx) => (
                <div key={idx} className="relative w-32">
                  <img src={url} alt="preview" className="w-full rounded border shadow" />
                  <button onClick={() => handleRemoveImage(idx)} type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white w-6 h-6 rounded-full">×</button>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded  border border-[#b87333] hover:bg-blue-700">
            Zapisz zmiany
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default MarketEdit;
