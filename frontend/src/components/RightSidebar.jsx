import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import PrivateChatModal from './chat/PrivateChatModal';

const RightSidebar = () => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId && socket && socket.connected) {
      console.log('Wysyłam user_connected:', userId);
      socket.emit('user_connected', userId);
    } else {
      socket.on('connect', () => {
        console.log('Socket połączony, wysyłam user_connected:', userId);
        socket.emit('user_connected', userId);
      });
    }

    fetch('http://localhost:5000/api/chat/users')
      .then((res) => res.json())
      .then((data) => {
        console.log('Odebrani użytkownicy:', data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error('Błąd pobierania użytkowników:', err);
        setUsers([]);
      });

    socket.on('users_online', (list) => {
      setOnlineUsers(list);
    });

    return () => {
      socket.off('users_online');
    };
  }, [socket]);

  const startPrivateChat = (targetId, targetName) => {
    console.log('Rozpoczynam czat z:', targetName, targetId);
    setSelectedUser({ id: targetId, username: targetName });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Czat / Znajomi</h2>
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        {users.map((user) => (
          <li
            key={user.id}
            className="cursor-pointer hover:underline"
            onClick={() => startPrivateChat(user.id, user.username)}
          >
            {user.username}{' '}
            <span
              className={`text-xs ${
                onlineUsers.includes(user.id) ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              ({onlineUsers.includes(user.id) ? 'online' : 'offline'})
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs italic mt-4 text-gray-400 dark:text-gray-500">
        Kliknij użytkownika, by rozpocząć czat.
      </p>

      {/* MODAL */}
      {selectedUser && (
        <PrivateChatModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default RightSidebar;
