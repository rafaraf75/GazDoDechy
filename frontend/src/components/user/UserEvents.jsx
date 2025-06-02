import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';
import axios from 'axios';
import Hero from '../common/Hero';

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/event-attendance/user/${userId}`);
        setEvents(res.data || []);
      } catch (err) {
        console.error('Błąd pobierania wydarzeń:', err);
      }
    };
    if (userId) fetchEvents();
  }, [userId]);

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      <div className="p-4">
        <Hero slug="user-events" />
        {events.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Nie jesteś zapisany na żadne wydarzenie.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-5"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {event.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserEvents;
