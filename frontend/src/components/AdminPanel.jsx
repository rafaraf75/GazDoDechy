import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow rounded p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Panel administratora</h1>

      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Nazwa użytkownika</th>
            <th className="p-2 border">Rola</th>
            <th className="p-2 border">Zablokowany</th>
            <th className="p-2 border">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">{user.isBlocked ? 'Tak' : 'Nie'}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleBlock(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Zablokuj
                </button>
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Odblokuj
                </button>
                {user.role === 'admin' ? (
                  <button
                    onClick={() => handleRoleChange(user.id, 'user')}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Odbierz admina
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleChange(user.id, 'admin')}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
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
  );
};

export default AdminPanel;
