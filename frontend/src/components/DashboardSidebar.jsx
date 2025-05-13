// src/components/DashboardSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => (
  <div className="bg-white rounded-lg shadow p-4 space-y-3">
    <h2 className="font-semibold text-lg mb-2"> Menu</h2>
    <ul className="text-sm text-gray-700 space-y-2">
      <li>
        <Link to="/market" className="hover:text-blue-600 block">
           Autogiełda
        </Link>
      </li>
      <li>
        <Link to="/tips" className="hover:text-blue-600 block">
           Porady i naprawy
        </Link>
      </li>
      <li>
        <Link to="/groups" className="hover:text-blue-600 block">
           Grupy tematyczne
        </Link>
      </li>
      <li>
        <Link to="/events" className="hover:text-blue-600 block">
           Zloty i wydarzenia
        </Link>
      </li>
      <li>
        <Link to="/help" className="hover:text-blue-600 block">
           Porady online
        </Link>
      </li>
    </ul>
  </div>
);

export default DashboardSidebar;