import React from 'react';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 space-y-3 rounded-b-lg">
      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Mój profil</h3>
      <ul className="space-y-2">
        <li><Link to="/user" className="text-blue-600 dark:text-blue-400">Oś czasu</Link></li>
        <li><Link to="/user/settings" className="text-blue-600 dark:text-blue-400">Edytuj profil</Link></li>
        <li><Link to="/user/vehicles" className="text-blue-600 dark:text-blue-400">Moje pojazdy</Link></li>
        <li><Link to="/user/ads" className="text-blue-600 dark:text-blue-400">Moje ogłoszenia</Link></li>
        <li><Link to="/user/following" className="text-blue-600 dark:text-blue-400">Obserwowane</Link></li>
        <li><Link to="/user/events" className="text-blue-600 dark:text-blue-400">Wydarzenia</Link></li>
      </ul>
    </div>
  );
};

export default UserSidebar;
