import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MarketItemCard = ({ ad }) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = ad.image_url || '';

  return (
    <Link to={`/market/${ad.id}`}>
    <div className="bg-white dark:bg-gray-800  border border-[#b87333] text-gray-900 dark:text-gray-100 rounded-lg shadow p-4">
      <img
        src={imageError || !imageUrl ? '/fallback.jpg' : imageUrl}
        alt={ad.title}
        className="w-full h-40 object-cover rounded mb-2"
        onError={() => setImageError(true)}
      />
      <h3 className="font-semibold text-lg">{ad.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Rok: {ad.year || 'Brak'}, Cena: {ad.price?.toLocaleString('pl-PL')} zł
      </p>
    </div>
    </Link>
  );
};

export default MarketItemCard;
