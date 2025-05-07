// src/components/DashboardSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => (
  <div className="bg-white rounded-lg shadow p-4 space-y-2">
    <h2 className="font-semibold text-lg">Menu</h2>
    <ul className="text-sm text-gray-700 space-y-1">
      <li>
        <Link to="/groups" className="hover:underline block">Grupy tematyczne</Link>
      </li>
      <li>
        <Link to="/tips" className="hover:underline block">Porady „Jak to naprawić”</Link>
      </li>
      <li>
        <Link to="/market" className="hover:underline block">Autogiełda</Link>
      </li>
      <li>
        <Link to="/events" className="hover:underline block">Zloty i wydarzenia</Link>
      </li>
    </ul>
  </div>
);

export default DashboardSidebar;
