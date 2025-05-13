import React from 'react';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h3 className="font-bold text-lg">Mój profil</h3>
      <ul className="space-y-2 text-blue-600">
        <li><Link to="/user"> Oś czasu</Link></li>
        <li><Link to="/user/settings"> Edytuj profil</Link></li>
        <li><Link to="/user/vehicles"> Moje pojazdy</Link></li>
        <li><Link to="/user/ads"> Moje ogłoszenia</Link></li>
        <li><Link to="/user/following"> Obserwowane</Link></li>
        <li><Link to="/user/events"> Wydarzenia</Link></li>
      </ul>
    </div>
  );
};

export default UserSidebar;
