import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarketSearchForm = ({ selectedCategory, onSearch }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [partTypeId, setPartTypeId] = useState('');
  const [title, setTitle] = useState('');
  const [partTypes, setPartTypes] = useState([]);

  useEffect(() => {
    if (selectedCategory === 'Części') {
      axios.get('http://localhost:5000/api/part-types')
        .then(res => setPartTypes(res.data || []))
        .catch(err => console.error('Błąd pobierania typów części:', err));
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      category: selectedCategory,
      brand,
      model,
      year,
      priceMax,
      part_type_id: partTypeId,
      title
    };

    // usunięcie pustych wartości
    Object.keys(filters).forEach(key => {
      if (!filters[key]) delete filters[key];
    });

    onSearch(filters);
  };

  return (
    <form
      className="flex flex-wrap gap-4 mb-4 items-center"
      onSubmit={handleSubmit}
    >
      {(selectedCategory === 'Samochody' || selectedCategory === 'Motocykle' || selectedCategory === 'Części') && (
        <>
          <input
            type="text"
            placeholder="Marka"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="flex-1 min-w-[150px] p-2 rounded  border border-[#b87333] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="flex-1 min-w-[150px] p-2 rounded  border border-[#b87333] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </>
      )}

      {(selectedCategory === 'Samochody' || selectedCategory === 'Motocykle') && (
        <input
          type="number"
          placeholder="Rok"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-[100px] p-2 rounded  border border-[#b87333] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      )}

      {selectedCategory === 'Części' && (
        <select
          value={partTypeId}
          onChange={(e) => setPartTypeId(e.target.value)}
          className="flex-1 min-w-[180px] p-2 rounded border border-[#b87333] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">-- Wybierz typ części --</option>
          {partTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      )}

      {selectedCategory === 'Narzędzia' && (
        <input
          type="text"
          placeholder="Tytuł / słowo kluczowe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 min-w-[200px] p-2 rounded border  border border-[#b87333] dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      )}

      <input
        type="number"
        placeholder="Cena max"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        className="w-[120px] p-2 rounded  border border-[#b87333] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700  border border-[#b87333] text-white py-2 px-4 rounded dark:bg-green-700 dark:hover:bg-green-800"
      >
        Szukaj
      </button>
    </form>
  );
};

export default MarketSearchForm;
