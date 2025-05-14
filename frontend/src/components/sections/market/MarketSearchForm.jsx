import React from 'react';

const MarketSearchForm = () => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <input
        type="text"
        placeholder="Marka"
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        placeholder="Model"
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="number"
        placeholder="Rok"
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="number"
        placeholder="Cena max"
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />

      <div className="md:col-span-2 lg:col-span-4">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded dark:bg-green-700 dark:hover:bg-green-800"
        >
          Szukaj
        </button>
      </div>
    </form>
  );
};

export default MarketSearchForm;
