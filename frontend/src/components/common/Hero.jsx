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
      className="relative w-full rounded-xl overflow-hidden mb-6 shadow"
      style={{
        backgroundImage: `url(${heroData.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '220px',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
        <h1 className="text-3xl font-bold mb-2">{heroData.title}</h1>
        <p className="text-md max-w-2xl">{heroData.description}</p>
      </div>
    </div>
  );
};

export default Hero;
