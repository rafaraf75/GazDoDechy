import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = ({ slug }) => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hero/${slug}`);
        setHeroData(res.data);
      } catch (err) {
        console.error('Błąd ładowania hero:', err);
      }
    };

    if (slug) fetchHero();
  }, [slug]);

  if (!heroData) return null;

  return (
    <div
      className="w-full rounded-xl border border-[#b87333] overflow-hidden mb-6 shadow p-10 text-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      <h1 className="text-3xl font-bold mb-2">{heroData.title}</h1>
      <p className="text-md max-w-2xl mx-auto">{heroData.subtitle}</p>
    </div>
  );
};

export default Hero;