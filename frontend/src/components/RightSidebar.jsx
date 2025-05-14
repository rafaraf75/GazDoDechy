import React from 'react';

const RightSidebar = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Czat / Znajomi</h2>
    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
      <li> Ryszard <span className="text-green-500 text-xs">(online)</span></li>
      <li> Adam <span className="text-gray-400 dark:text-gray-500 text-xs">(offline)</span></li>
      <li> Ania <span className="text-green-500 text-xs">(online)</span></li>
    </ul>
    <p className="text-xs italic mt-4 text-gray-400 dark:text-gray-500">czat....</p>
  </div>
);

export default RightSidebar;