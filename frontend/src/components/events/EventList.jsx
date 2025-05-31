import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Błąd pobierania wydarzeń:', err);
      }
    };

    fetchEvents();
  }, []);

  if (events.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic">
        Brak zaplanowanych wydarzeń.
      </p>
    );
  }

  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Lista wydarzeń
      </h4>
      <ul className="space-y-2 mt-4">
        {events.map(event => (
          <li
            key={event.id}
            className="bg-white dark:bg-gray-800 p-3 rounded shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {event.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {event.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
