// src/components/RightSidebar.jsx
import React from 'react';

const RightSidebar = () => (
  <div className="bg-white rounded-lg shadow p-4">
    <h2 className="font-semibold text-lg">💬 Czat / Znajomi</h2>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>🚗 Damian <span className="text-green-500 text-xs">(online)</span></li>
      <li>🚗 Kacper <span className="text-gray-400 text-xs">(offline)</span></li>
      <li>🚗 Ania <span className="text-green-500 text-xs">(online)</span></li>
    </ul>
    <p className="text-xs italic mt-4 text-gray-400">Funkcja czatu już wkrótce!</p>
  </div>
);

export default RightSidebar;
