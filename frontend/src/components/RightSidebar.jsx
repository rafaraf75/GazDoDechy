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

      {/* MODAL */}
      {selectedUser && (
        <PrivateChatModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          socket={socket}
          userId={localStorage.getItem('userId')}
          senderName={users.find(u => u.id === localStorage.getItem('userId'))?.username || 'Ty'}
        />
      )}
    </div>
  );
};

export default RightSidebar;
