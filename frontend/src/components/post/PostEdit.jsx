import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: '',
    image_urls: [],
    image_public_ids: []
  });

  const [previewUrls, setPreviewUrls] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        const post = res.data;

        const imageUrls = post.post_images?.map(img => img.url) || [];
        const imagePublicIds = post.post_images?.map(img => img.public_id) || [];

        setFormData({
          description: post.description,
          image_urls: imageUrls,
          image_public_ids: imagePublicIds
        });
        setPreviewUrls(imageUrls);
      } catch (err) {
        console.error('Błąd ładowania posta:', err);
        alert('Nie udało się załadować posta');
      }
    };

    fetchPost();
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
      formData.append('folder', 'vehicles');

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem('userId');
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
      description: formData.description,
      user_id,
      image_urls: updatedUrls,
      image_public_ids: updatedPublicIds
    };

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, payload);
      alert('Post został zaktualizowany');
      navigate('/user');
    } catch (err) {
      console.error('Błąd aktualizacji posta:', err);
      alert('Nie udało się zaktualizować posta');
    }
  };

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-gray-900 dark:text-gray-100">
        <h1 className="text-xl font-bold mb-4">Edytuj post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Opis"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
          />

          <input type="file" multiple accept="image/*" onChange={handleNewImages} className="dark:text-white" />

          {previewUrls.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {previewUrls.map((url, idx) => (
                <div key={idx} className="relative w-32">
                  <img src={url} alt="preview" className="w-full rounded border shadow" />
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white w-6 h-6 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Zapisz zmiany
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PostEdit;
