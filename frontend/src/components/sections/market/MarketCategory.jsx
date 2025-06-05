import React from 'react';

const categories = ['Samochody', 'Motocykle', 'Części', 'Narzędzia'];

const MarketCategory = () => {
  return (
    <div className="flex flex-wrap  border border-[#b87333] gap-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2  border border-[#b87333] rounded"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default MarketCategory;
