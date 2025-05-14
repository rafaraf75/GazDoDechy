import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  // Pobierz użytkowników przy załadowaniu
  useEffect(() => {
    fetchUsers();
  }, []);

  // Funkcja pobierająca użytkowników z backendu
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/full');
      setUsers(res.data);
    } catch (err) {
      console.error('Błąd pobierania użytkowników:', err);
    }
  };

  // Blokowanie użytkownika
  const handleBlock = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/user-status/block/${id}`);
      fetchUsers(); // odśwież dane
    } catch (err) {
      console.error('Błąd blokowania:', err);
    }
  };

  // Odblokowanie użytkownika
  const handleUnblock = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/user-status/unblock/${id}`);
      fetchUsers(); // odśwież dane
    } catch (err) {
      console.error('Błąd odblokowania:', err);
    }
  };

  // Zmiana roli użytkownika (admin <-> user)
  const handleRoleChange = async (id, newRole) => {
    try {
      // używamy dedykowanej ścieżki /api/users/:id/role z backendu
      await axios.put(`http://localhost:5000/api/users/${id}/role`, {
        role: newRole,
      });
      fetchUsers(); // odśwież dane
    } catch (err) {
      console.error('Błąd zmiany roli:', err);
    }
  };

  return (
    <Layout leftSidebar={null} rightSidebar={null}>
    <div className="max-w-5xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow rounded p-6">
      <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">
        Panel administratora
      </h1>

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
              <td className="p-2 border dark:border-gray-700">
                {user.isBlocked ? 'Tak' : 'Nie'}
              </td>
              <td className="p-2 border dark:border-gray-700 space-x-2">
                <button
                  onClick={() => handleBlock(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Zablokuj
                </button>
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                >
                  Odblokuj
                </button>
                {user.role === 'admin' ? (
                  <button
                    onClick={() => handleRoleChange(user.id, 'user')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Odbierz admina
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleChange(user.id, 'admin')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Nadaj admina
                  </button>
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
