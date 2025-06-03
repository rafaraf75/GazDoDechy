import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { label: 'Autogiełda', to: '/market' },
  { label: 'Porady i naprawy', to: '/tips' },
  { label: 'Grupy tematyczne', to: '/groups' },
  { label: 'Zloty i wydarzenia', to: '/events' },
  { label: 'Porady online', to: '/help' }
];

const DashboardSidebar = () => (
  <div className="bg-white dark:bg-gray-800 shadow p-4 space-y-4 rounded-b-lg">
    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Menu</h3>
    <ul className="space-y-2">
      {menuItems.map((item, i) => (
        <li key={i}>
          <Link
            to={item.to}
            className="block px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium hover:bg-blue-600 hover:text-white hover:translate-x-1 hover:shadow-md transition-all duration-200"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default DashboardSidebar;
