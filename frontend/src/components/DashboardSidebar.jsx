import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => (
  <div className="bg-white dark:bg-gray-800 shadow p-4 space-y-3 rounded-b-lg">
    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Menu</h3>
    <ul className="space-y-2">
      <li><Link to="/market" className="text-blue-600 dark:text-blue-400">Autogiełda</Link></li>
      <li><Link to="/tips" className="text-blue-600 dark:text-blue-400">Porady i naprawy</Link></li>
      <li><Link to="/groups" className="text-blue-600 dark:text-blue-400">Grupy tematyczne</Link></li>
      <li><Link to="/events" className="text-blue-600 dark:text-blue-400">Zloty i wydarzenia</Link></li>
      <li><Link to="/help" className="text-blue-600 dark:text-blue-400">Porady online</Link></li>
    </ul>
  </div>
);

export default DashboardSidebar;
