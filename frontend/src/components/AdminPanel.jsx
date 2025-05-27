import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [heros, setHeros] = useState([]);
  const [newHero, setNewHero] = useState({ page: '', heading: '', subheading: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchHeros();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/full');
      setUsers(res.data);
    } catch (err) {
      console.error('Błąd pobierania użytkowników:', err);
    }
  };

  const fetchHeros = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hero');
      setHeros(res.data);
    } catch (err) {
      console.error('Błąd pobierania hero:', err);
    }
  };

  const handleBlock = async (id) => {
    await axios.post(`http://localhost:5000/api/user-status/block/${id}`);
    fetchUsers();
  };

  const handleUnblock = async (id) => {
    await axios.post(`http://localhost:5000/api/user-status/unblock/${id}`);
    fetchUsers();
  };

  const handleRoleChange = async (id, newRole) => {
    await axios.put(`http://localhost:5000/api/users/${id}/role`, { role: newRole });
    fetchUsers();
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setNewHero((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddHero = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('page', newHero.page);
    formData.append('heading', newHero.heading);
    formData.append('subheading', newHero.subheading);

    try {
      await axios.post('http://localhost:5000/api/hero', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setNewHero({ page: '', heading: '', subheading: '' });
      setImageFile(null);
      fetchHeros();
    } catch (err) {
      console.error('Błąd dodawania hero:', err);
    }
  };

  const handleDeleteHero = async (id) => {
    await axios.delete(`http://localhost:5000/api/hero/${id}`);
    fetchHeros();
  };

  const handleEditHero = async (id) => {
  const updatedHeading = prompt('Nowy nagłówek:');
  const updatedSubheading = prompt('Nowy podtytuł:');
  if (!updatedHeading || !updatedSubheading) return;

  const changeImage = window.confirm('Czy chcesz zmienić obrazek?');
  if (changeImage) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('image', image);
      formData.append('heading', updatedHeading);
      formData.append('subheading', updatedSubheading);

      try {
        await axios.put(`http://localhost:5000/api/hero/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        fetchHeros();
      } catch (err) {
        console.error('Błąd aktualizacji hero (z obrazkiem):', err);
      }
    };
    fileInput.click();
  } else {
    try {
      await axios.put(`http://localhost:5000/api/hero/${id}`, {
        heading: updatedHeading,
        subheading: updatedSubheading
      });
      fetchHeros();
    } catch (err) {
      console.error('Błąd aktualizacji hero:', err);
    }
  }
};

  return (
    <Layout leftSidebar={null} rightSidebar={null}>
      <div className="max-w-5xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow rounded p-6 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">Panel administratora</h1>

        {/* Zarządzanie hero */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Zarządzaj Hero sekcjami</h2>

          <div className="space-y-4 mb-6">
            {heros.map((hero) => (
              <div key={hero.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-600">
                <div><strong>Strona:</strong> {hero.page}</div>
                <div><strong>Nagłówek:</strong> {hero.heading}</div>
                <div><strong>Podtytuł:</strong> {hero.subheading}</div>
                <div>
                  <strong>Obrazek:</strong>{' '}
                  <a href={hero.image_url} className="text-blue-500 underline ml-1" target="_blank" rel="noreferrer">
                    Zobacz
                  </a>
                </div>
                <div className="mt-2 space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEditHero(hero.id)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteHero(hero.id)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="page"
              value={newHero.page}
              onChange={handleHeroChange}
              placeholder="Nazwa strony (np. grupa-offroad)"
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              name="heading"
              value={newHero.heading}
              onChange={handleHeroChange}
              placeholder="Nagłówek"
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              name="subheading"
              value={newHero.subheading}
              onChange={handleHeroChange}
              placeholder="Podtytuł"
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="dark:text-white"
            />
            <button
              onClick={handleAddHero}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
            >
              Dodaj nową sekcję hero
            </button>
          </div>
        </div>

        {/* Tabela użytkowników */}
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <th className="p-2 border dark:border-gray-700">Email</th>
              <th className="p-2 border dark:border-gray-700">Nazwa użytkownika</th>
              <th className="p-2 border dark:border-gray-700">Rola</th>
              <th className="p-2 border dark:border-gray-700">Zablokowany</th>
              <th className="p-2 border dark:border-gray-700">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center text-gray-900 dark:text-gray-100">
                <td className="p-2 border dark:border-gray-700">{user.email}</td>
                <td className="p-2 border dark:border-gray-700">{user.username}</td>
                <td className="p-2 border dark:border-gray-700">{user.role}</td>
                <td className="p-2 border dark:border-gray-700">{user.isBlocked ? 'Tak' : 'Nie'}</td>
                <td className="p-2 border dark:border-gray-700 space-x-2">
                  <button onClick={() => handleBlock(user.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Zablokuj</button>
                  <button onClick={() => handleUnblock(user.id)} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">Odblokuj</button>
                  {user.role === 'admin' ? (
                    <button onClick={() => handleRoleChange(user.id, 'user')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">Odbierz admina</button>
                  ) : (
                    <button onClick={() => handleRoleChange(user.id, 'admin')} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">Nadaj admina</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminPanel;
