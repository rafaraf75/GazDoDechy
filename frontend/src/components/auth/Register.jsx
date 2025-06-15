import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validate = () => {
    if (!email.includes('@')) {
      setMessage('Nieprawidłowy adres e-mail.');
      return false;
    }
    if (username.trim().length < 3) {
      setMessage('Nazwa użytkownika musi mieć min. 3 znaki.');
      return false;
    }
    if (password.length < 6) {
      setMessage('Hasło musi mieć min. 6 znaków.');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        email,
        username,
        password
      });
      setMessage('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (err) {
      setMessage('Rejestracja nieudana. Użytkownik może już istnieje.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Rejestracja</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Zarejestruj się
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-4">{message}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Masz już konto?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
