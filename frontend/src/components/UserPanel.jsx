import React, { useEffect, useState } from 'react';

const UserPanel = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) setUsername(name);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Twój profil</h1>
        <p className="text-gray-700 mb-2">
          <strong>Nazwa użytkownika:</strong> {username}
        </p>
        <p className="text-sm text-gray-500 mt-6">
          Tutaj możesz dodać więcej informacji o użytkowniku — np. edycję danych, zdjęcie profilowe, zmiana hasła itp.
        </p>
      </div>
    </div>
  );
};

export default UserPanel;