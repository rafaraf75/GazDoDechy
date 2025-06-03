import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const PrivateChatModal = ({ user, onClose, socket, userId, senderName }) => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const nodeRef = useRef(null);

  // Załaduj historię czatu
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/chat/history?senderId=${userId}&receiverId=${user.id}`
        );
        const data = await res.json();
        setChatLog(data);
      } catch (err) {
        console.error('Błąd ładowania historii:', err);
      }
    };
    loadHistory();
  }, [userId, user.id]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMsg = {
      senderId: userId,
      receiverId: user.id,
      senderName,
      text: message,
    };

    // Emit przez socket.io
    socket.emit('private_message', newMsg);

    // Lokalnie dodaj wiadomość
    setChatLog((prev) => [...prev, { ...newMsg, fromMe: true }]);
    setMessage('');

    // Zapis do bazy (opcjonalnie, ale warto!)
    try {
      await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });
    } catch (err) {
      console.error('Błąd zapisu wiadomości:', err);
    }
  };

  return (
    <Draggable handle=".chat-header" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="fixed z-50 bottom-4 right-4 w-[350px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col h-[420px] text-gray-900 dark:text-white"
      >
        {/* Nagłówek */}
        <div className="chat-header bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 flex justify-between items-center rounded-t">
          <h3 className="font-semibold text-sm">Czat z {user.username}</h3>
          <button onClick={onClose} className="text-red-400 hover:text-red-600">✕</button>
        </div>

        {/* Wiadomości */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm">
          {chatLog.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-3 py-2 rounded-md ${
                msg.sender_id === userId
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {msg.sender_id !== userId && (
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  {msg.users?.username || 'Użytkownik'}
                </p>
              )}
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Wysyłanie */}
        <div className="p-2 border-t border-gray-300 dark:border-gray-700 flex">
          <input
            type="text"
            placeholder="Wpisz wiadomość..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-3 py-2 rounded-l-md bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 px-4 rounded-r-md text-white hover:bg-blue-700"
          >
            Wyślij
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default PrivateChatModal;
