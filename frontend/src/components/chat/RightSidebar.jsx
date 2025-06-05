import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import PrivateChatModal from './PrivateChatModal';

const RightSidebar = () => {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Regularne pobieranie online users
  const fetchOnlineUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/chat/online-users');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOnlineUsers(data); // oczekujemy tablicy ID
      }
    } catch (err) {
      console.error('Błąd odpytywania online-users:', err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    // Emit user_connected przy połączeniu
    if (userId && socket && socket.connected) {
      socket.emit('user_connected', userId);
    } else {
      socket.on('connect', () => {
        socket.emit('user_connected', userId);
      });
    }

    // Pobierz listę użytkowników (wszyscy)
    fetch('http://localhost:5000/api/chat/users')
      .then((res) => res.json())
      .then((data) => {
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

    // Ustaw interwał co 10s do odświeżenia listy online
    const interval = setInterval(fetchOnlineUsers, 5000);

    // Posprzątaj po odmontowaniu komponentu
    return () => {
      socket.off('users_online');
      clearInterval(interval);
    };
  }, [socket]);

  const startPrivateChat = (targetId, targetName) => {
    setSelectedUser({ id: targetId, username: targetName });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 space-y-3 rounded-b-lg">
      <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Czat / Znajomi</h2>
      <ul className="space-y-2">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user.id);
          return (
            <li
              key={user.id}
              onClick={() => startPrivateChat(user.id, user.username)}
              className={`px-3 py-2 rounded-md cursor-pointer transition-all duration-150
                ${isOnline ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-200 dark:bg-gray-700'}
                hover:bg-blue-500 hover:text-white`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{user.username}</span>
                <span className={`text-xs ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {isOnline ? '● online' : '○ offline'}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-xs italic mt-4 text-gray-400 dark:text-gray-500">
        Kliknij użytkownika, by rozpocząć czat.
      </p>

      {selectedUser && (
        <PrivateChatModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          socket={socket}
          userId={localStorage.getItem('userId')}
          senderName={
            users.find((u) => u.id === localStorage.getItem('userId'))?.username || 'Ty'
          }
        />
      )}
    </div>
  );
};

export default RightSidebar;
