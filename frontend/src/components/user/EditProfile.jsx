import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';
import axios from 'axios';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    bio: '',
    profilePicture: '',
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const data = res.data;

        setFormData({
          ...data,
          profilePicture: !data.profilePicture || data.profilePicture === 'null' ? '' : data.profilePicture
        });
      } catch (err) {
        console.error('Błąd pobierania danych:', err);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = formData.username.trim();
    const trimmedBio = formData.bio.trim();
    const trimmedUrl = formData.profilePicture.trim();

    if (!trimmedUsername) {
      alert('Nazwa użytkownika nie może być pusta.');
      return;
    }

    if (trimmedBio.length > 300) {
      alert('Bio może mieć maksymalnie 300 znaków.');
      return;
    }

    if (
      trimmedUrl !== '' &&
      !/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(trimmedUrl)
    ) {
      alert('URL zdjęcia profilowego musi być poprawnym adresem.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, {
        username: trimmedUsername,
        bio: trimmedBio,
        profilePicture: trimmedUrl,
      });
      alert('Profil zaktualizowany!');
    } catch (err) {
      console.error('Błąd zapisu:', err);
    }
  };

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Twój profil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Email (tylko do odczytu)</label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold">Rola (tylko do odczytu)</label>
          <input
            type="text"
            value={formData.role}
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold">Nazwa użytkownika</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold">URL zdjęcia profilowego</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {formData.profilePicture && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Podgląd zdjęcia profilowego:</p>
            <img
              src={formData.profilePicture}
              alt="Zdjęcie profilowe"
              className="w-32 h-32 object-cover rounded-full border"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Brak+zdjęcia';
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Zapisz zmiany
        </button>
      </form>
      <hr className="my-6" />
<h2 className="text-xl font-semibold mb-2">Zmiana hasła</h2>
<form
  onSubmit={async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    const email = formData.email;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Wszystkie pola muszą być wypełnione.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Nowe hasło musi mieć co najmniej 6 znaków.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Nowe hasła się nie zgadzają.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Błąd zmiany hasła');
      } else {
        alert('Hasło zostało zmienione!');
        e.target.reset();
      }
    } catch (err) {
      console.error('Błąd połączenia z serwerem:', err);
      alert('Nie udało się zmienić hasła.');
    }
  }}
  className="space-y-4"
>
  <div>
    <label className="block font-semibold">Stare hasło</label>
    <input type="password" name="oldPassword" className="w-full border rounded p-2" />
  </div>
  <div>
    <label className="block font-semibold">Nowe hasło</label>
    <input type="password" name="newPassword" className="w-full border rounded p-2" />
  </div>
  <div>
    <label className="block font-semibold">Powtórz nowe hasło</label>
    <input type="password" name="confirmPassword" className="w-full border rounded p-2" />
  </div>
  <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
    Zmień hasło
  </button>
</form>
    </div>
    </Layout>
  );
};

export default EditProfile;
