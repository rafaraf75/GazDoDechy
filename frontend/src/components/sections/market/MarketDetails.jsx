import React from 'react';

const MarketDetails = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-6 max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Audi A4 – 2018</h1>
      <img
        src="https://via.placeholder.com/800x400"
        alt="auto"
        className="w-full h-auto object-cover rounded mb-4"
      />
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Opis pojazdu, szczegóły techniczne, kontakt do właściciela...
        <br />
        Silnik: 2.0 TDI, Przebieg: 120 000 km, Skrzynia: automatyczna, Kolor: czarny
      </p>
    </div>
  );
};

export default MarketDetails;
