import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../common/Layout';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [heros, setHeros] = useState([]);
  const [groups, setGroups] = useState([]);

  const [newHero, setNewHero] = useState({ slug: '', title: '', subtitle: '' });
  const [editingHero, setEditingHero] = useState(null);

  const [newGroup, setNewGroup] = useState({ slug: '', name: '', description: '' });
  const [editingGroup, setEditingGroup] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchHeros();
    fetchGroups();
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

  const fetchGroups = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/groups');
      setGroups(res.data);
    } catch (err) {
      console.error('Błąd pobierania grup:', err);
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

  // HERO HANDLING
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setNewHero((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHero = async () => {
    try {
      await axios.post('http://localhost:5000/api/hero', newHero);
      alert('Nowa sekcja hero została dodana.');
      setNewHero({ slug: '', title: '', subtitle: '' });
      fetchHeros();
    } catch (err) {
      console.error('Błąd dodawania hero:', err);
    }
  };

  const handleEditHero = (hero) => {
    setEditingHero(hero);
    setNewHero({ slug: hero.slug, title: hero.title, subtitle: hero.subtitle });
  };

  const handleSaveEditHero = async () => {
    try {
      await axios.put(`http://localhost:5000/api/hero/${editingHero.id}`, {
        title: newHero.title,
        subtitle: newHero.subtitle,
      });
      alert('Hero zaktualizowany.');
      setEditingHero(null);
      setNewHero({ slug: '', title: '', subtitle: '' });
      fetchHeros();
    } catch (err) {
      console.error('Błąd aktualizacji hero:', err);
    }
  };

  const handleCancelEditHero = () => {
    setEditingHero(null);
    setNewHero({ slug: '', title: '', subtitle: '' });
  };

  const handleDeleteHero = async (id) => {
    await axios.delete(`http://localhost:5000/api/hero/${id}`);
    fetchHeros();
  };

  // GROUP HANDLING
  const handleGroupChange = (e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGroup = async () => {
    try {
      await axios.post('http://localhost:5000/api/groups', newGroup);
      alert('Nowa grupa została dodana.');
      setNewGroup({ slug: '', name: '', description: '' });
      fetchGroups();
    } catch (err) {
      console.error('Błąd dodawania grupy:', err);
    }
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group);
    setNewGroup({ slug: group.slug, name: group.name, description: group.description });
  };

  const handleSaveEditGroup = async () => {
    try {
      await axios.put(`http://localhost:5000/api/groups/${editingGroup.id}`, {
        name: newGroup.name,
        description: newGroup.description,
      });
      alert('Grupa zaktualizowana.');
      setEditingGroup(null);
      setNewGroup({ slug: '', name: '', description: '' });
      fetchGroups();
    } catch (err) {
      console.error('Błąd edycji grupy:', err);
    }
  };

  const handleCancelEditGroup = () => {
    setEditingGroup(null);
    setNewGroup({ slug: '', name: '', description: '' });
  };

  const handleDeleteGroup = async (id) => {
    await axios.delete(`http://localhost:5000/api/groups/${id}`);
    fetchGroups();
  };

  return (
    <Layout leftSidebar={null} rightSidebar={null}>
      <div className="max-w-5xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow rounded p-6 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">Panel administratora</h1>

        {/* HERO SEKCJE */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Zarządzaj Hero sekcjami</h2>

          {heros.map((hero) => (
            <div key={hero.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow  border border-[#b87333] mb-3">
              <div><strong>Strona:</strong> {hero.slug}</div>
              <div><strong>Nagłówek:</strong> {hero.title}</div>
              <div><strong>Podtytuł:</strong> {hero.subtitle}</div>
              <div className="mt-2 space-x-2">
                <button onClick={() => handleEditHero(hero)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edytuj</button>
                <button onClick={() => handleDeleteHero(hero.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Usuń</button>
              </div>
            </div>
          ))}

          <div className="space-y-2">
            <input type="text" name="slug" value={newHero.slug} onChange={handleHeroChange} placeholder="Slug strony (np. groups)" disabled={editingHero !== null} className="w-full p-2 rounded border border-[#b87333] bg-gray-100 dark:bg-gray-700" />
            <input type="text" name="title" value={newHero.title} onChange={handleHeroChange} placeholder="Nagłówek" className="w-full p-2 rounded border border-[#b87333] bg-gray-100 dark:bg-gray-700" />
            <input type="text" name="subtitle" value={newHero.subtitle} onChange={handleHeroChange} placeholder="Podtytuł" className="w-full p-2 rounded border border-[#b87333] bg-gray-100 dark:bg-gray-700" />
            {editingHero ? (
              <>
                <button onClick={handleSaveEditHero} className="bg-blue-600 text-white px-4 py-2 rounded border border-[#b87333]">Zapisz</button>
                <button onClick={handleCancelEditHero} className="bg-gray-600 text-white px-4 py-2 rounded border border-[#b87333] ml-2">Anuluj</button>
              </>
            ) : (
              <button onClick={handleAddHero} className="bg-green-600 text-white px-4 py-2 rounded border border-[#b87333]">Dodaj sekcję hero</button>
            )}
          </div>
        </section>

        {/* GRUPY */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">Zarządzaj Grupami</h2>

          {groups.map((group) => (
            <div key={group.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow  border border-[#b87333] mb-3">
              <div><strong>Slug:</strong> {group.slug}</div>
              <div><strong>Nazwa:</strong> {group.name}</div>
              <div><strong>Opis:</strong> {group.description}</div>
              <div className="mt-2 space-x-2">
                <button onClick={() => handleEditGroup(group)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded border border-[#b87333]">Edytuj</button>
                <button onClick={() => handleDeleteGroup(group.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded border border-[#b87333]">Usuń</button>
              </div>
            </div>
          ))}

          <div className="space-y-2">
            <input type="text" name="slug" value={newGroup.slug} onChange={handleGroupChange} placeholder="Slug grupy (np. tuning)" disabled={editingGroup !== null} className="w-full p-2 rounded border border-[#b87333] bg-gray-100 dark:bg-gray-700" />
            <input type="text" name="name" value={newGroup.name} onChange={handleGroupChange} placeholder="Nazwa grupy" className="w-full p-2 rounded border border-[#b87333] bg-gray-100 dark:bg-gray-700" />
            <input type="text" name="description" value={newGroup.description} onChange={handleGroupChange} placeholder="Opis grupy" className="w-full p-2 rounded border border-[#b87333] bg-gray-100 dark:bg-gray-700" />
            {editingGroup ? (
              <>
                <button onClick={handleSaveEditGroup} className="bg-blue-600 text-white px-4 py-2 rounded border border-[#b87333]">Zapisz</button>
                <button onClick={handleCancelEditGroup} className="bg-gray-600 text-white px-4 py-2 rounded border border-[#b87333] ml-2">Anuluj</button>
              </>
            ) : (
              <button onClick={handleAddGroup} className="bg-green-600 text-white px-4 py-2 rounded border border-[#b87333]">Dodaj grupę</button>
            )}
          </div>
        </section>

        {/* UŻYTKOWNICY */}
        <table className="min-w-full table-auto  border border-[#b87333]">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Nazwa</th>
              <th className="p-2 border">Rola</th>
              <th className="p-2 border">Zablokowany</th>
              <th className="p-2 border">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{user.isBlocked ? 'Tak' : 'Nie'}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => handleBlock(user.id)} className="bg-red-500 text-white px-2 py-1 rounded border border-[#b87333]">Zablokuj</button>
                  <button onClick={() => handleUnblock(user.id)} className="bg-green-500 text-white px-2 py-1 rounded border border-[#b87333]">Odblokuj</button>
                  {user.role === 'admin' ? (
                    <button onClick={() => handleRoleChange(user.id, 'user')} className="bg-yellow-500 text-white px-2 py-1 rounded border border-[#b87333]">Odbierz admina</button>
                  ) : (
                    <button onClick={() => handleRoleChange(user.id, 'admin')} className="bg-blue-500 text-white px-2 py-1 rounded border border-[#b87333]">Nadaj admina</button>
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
