import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarketSearchForm = ({ selectedCategory }) => {
  const [partTypes, setPartTypes] = useState([]);

  useEffect(() => {
    if (selectedCategory === 'Części') {
      axios.get('http://localhost:5000/api/part-types')
        .then(res => setPartTypes(res.data || []))
        .catch(err => console.error('Błąd pobierania typów części:', err));
    }
  }, [selectedCategory]);

  return (
    <form className="flex flex-wrap gap-4 mb-4 items-center">
      {/* Marka i model */}
      {(selectedCategory === 'Samochody' || selectedCategory === 'Motocykle' || selectedCategory === 'Części') && (
        <>
          <input
            type="text"
            placeholder="Marka"
            className="flex-1 min-w-[150px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Model"
            className="flex-1 min-w-[150px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </>
      )}

      {/* Rok produkcji tylko dla samochodów i motocykli */}
      {(selectedCategory === 'Samochody' || selectedCategory === 'Motocykle') && (
        <input
          type="number"
          placeholder="Rok"
          className="w-[100px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      )}

      {/* Typ części tylko dla części */}
      {selectedCategory === 'Części' && (
        <select
          className="flex-1 min-w-[180px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">-- Wybierz typ części --</option>
          {partTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      )}

      {/* Tytuł tylko dla narzędzi */}
      {selectedCategory === 'Narzędzia' && (
        <input
          type="text"
          placeholder="Tytuł / słowo kluczowe"
          className="flex-1 min-w-[200px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      )}

      {/* Cena max – dostępna dla wszystkich */}
      <input
        type="number"
        placeholder="Cena max"
        className="w-[120px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />

      {/* Szukaj – ostatni przycisk */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded dark:bg-green-700 dark:hover:bg-green-800"
      >
        Szukaj
      </button>
    </form>
  );
};

export default MarketSearchForm;
