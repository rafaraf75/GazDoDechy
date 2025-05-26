import React, { useState } from 'react';

const PostImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full">
      <img
        src={images[index].url}
        alt={`Zdjęcie ${index + 1}`}
        className="w-full max-h-[500px] object-cover rounded shadow"
      />

      {/* Nawigacja tylko przy wielu zdjęciach */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white px-2 py-1 rounded-full hover:bg-opacity-80"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white px-2 py-1 rounded-full hover:bg-opacity-80"
          >
            ▶
          </button>
        </>
      )}

      {/* Zawsze pokazuj numer zdjęcia */}
      <div className="text-center text-sm text-gray-400 mt-1">
        {index + 1} / {images.length}
      </div>
    </div>
  );
};

export default PostImageSlider;
