import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventDetailsModal = ({ event, onClose }) => {
  const userId = localStorage.getItem('userId');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const checkAttendance = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/event-attendance/is-attending', {
          params: {
            event_id: event.id,
            user_id: userId,
          },
        });
        setIsJoined(res.data.isAttending);
      } catch (err) {
        console.error('Błąd sprawdzania obecności:', err);
      }
    };

    checkAttendance();
  }, [event.id, userId]);

  const handleJoin = async () => {
    try {
      await axios.post('http://localhost:5000/api/event-attendance', {
        event_id: event.id,
        user_id: userId,
      });
      setIsJoined(true);
    } catch (err) {
      console.error('Błąd dołączania do wydarzenia:', err);
    }
  };

  const handleLeave = async () => {
    try {
      await axios.delete('http://localhost:5000/api/event-attendance', {
        data: {
          event_id: event.id,
          user_id: userId,
        },
      });
      setIsJoined(false);
    } catch (err) {
      console.error('Błąd opuszczania wydarzenia:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-gray-900 dark:text-gray-100">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Data:</strong> {event.date}
        </p>
        <p className="mb-2">{event.description}</p>

        <div className="flex justify-between mt-4">
          {isJoined ? (
            <button
              onClick={handleLeave}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Opuść wydarzenie
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Dołącz do wydarzenia
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
