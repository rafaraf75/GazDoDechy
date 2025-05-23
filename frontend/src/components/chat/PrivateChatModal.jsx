import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

const PrivateChatModal = ({ user, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const nodeRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      setChatLog([...chatLog, { sender: 'me', text: message }]);
      setMessage('');
    }
  };

  return (
    <Draggable handle=".chat-header" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="fixed z-50 bottom-4 right-4 w-[320px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-700 shadow-lg"
      >
        <div className="chat-header flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 rounded-t cursor-move">
          <strong>Czat z {user.username}</strong>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            X
          </button>
        </div>

        <div className="p-2 h-48 overflow-y-auto space-y-1">
          {chatLog.map((msg, index) => (
            <div key={index} className="text-sm text-right text-blue-500">
              {msg.text}
            </div>
          ))}
        </div>

        <div className="p-2 border-t border-gray-300 dark:border-gray-700 flex gap-2">
          <input
            type="text"
            placeholder="Wpisz wiadomość..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Wyślij
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default PrivateChatModal;
