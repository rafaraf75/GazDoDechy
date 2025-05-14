import React from 'react';

const MarketItemCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow p-4">
      <img
        src="https://via.placeholder.com/300x200?text=Auto"
        alt="auto"
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="font-semibold text-lg">Audi A4</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Rok: 2018, Cena: 45 000 zł
      </p>
    </div>
  );
};

export default MarketItemCard;
