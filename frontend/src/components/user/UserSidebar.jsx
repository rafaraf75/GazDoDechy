import React from 'react';
import { Link } from 'react-router-dom';

const userMenu = [
  { label: 'Oś czasu', to: '/user' },
  { label: 'Edytuj profil', to: '/user/settings' },
  { label: 'Moje pojazdy', to: '/user/vehicles' },
  { label: 'Moje ogłoszenia', to: '/user/ads' },
  { label: 'Obserwowane', to: '/user/following' },
  { label: 'Wydarzenia', to: '/user/events' }
];

const UserSidebar = () => (
  <div className="bg-white dark:bg-gray-800 shadow p-4 space-y-4 rounded-b-lg ">
    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Mój profil</h3>
    <ul className="space-y-2">
      {userMenu.map((item, index) => (
        <li key={index}>
          <Link
            to={item.to}
            className="block px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium border border-[#b87333] hover:bg-blue-600 hover:text-white hover:translate-x-1 hover:shadow-md transition-all duration-200"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default UserSidebar;
