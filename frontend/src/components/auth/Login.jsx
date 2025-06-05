import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const user = res.data.user;
      const userId = user.id;
      localStorage.setItem('userId', userId);
      const name = user.user_metadata?.username || user.email;
      const role = res.data.role || 'user';

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', name);
      localStorage.setItem('role', role);
      setUsername(name);
      setInfo(`Zalogowano jako: ${name}`);
      console.log('Logowanie OK — przekierowuję');
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (err) {
      setInfo('Logowanie nieudane');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
    setEmail('');
    setPassword('');
    setInfo('');
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Logowanie</h2>

        {username ? (
          <>
            <p className="mb-4 text-center">
              Zalogowano jako: <strong>{username}</strong>
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Wyloguj
            </button>
          </>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Zaloguj
            </button>
            {info && <p className="text-center text-sm text-red-500">{info}</p>}
            <p className="text-sm mt-4 text-center">
              Nie masz konta?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Zarejestruj się
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
