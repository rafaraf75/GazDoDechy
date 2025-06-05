import React from 'react';

const ArchivedRequestModal = ({ request, reply, onClose }) => {
  if (!request) return null;

  const getImageUrls = (data) => {
    if (Array.isArray(data)) return data;
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 border border-[#b87333] flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl font-bold text-gray-600 dark:text-white">
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Szczegóły zgłoszenia</h2>

        <p><strong>Użytkownik:</strong> {request.name}</p>
        <p><strong>Pojazd:</strong> {request.brand} {request.model} ({request.year})</p>
        <p><strong>Silnik:</strong> {request.engine}</p>
        <p><strong>Skrzynia:</strong> {request.gearbox}</p>
        <p className="mt-2"><strong>Opis:</strong> {request.description}</p>

        {getImageUrls(request.image_urls).length > 0 && (
          <div className="flex gap-3 mt-3 flex-wrap">
            {getImageUrls(request.image_urls).map((url, i) => (
              <img key={i} src={url} alt={`img-${i}`} className="w-32 rounded border" />
            ))}
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Odpowiedź mechanika:</h3>
          <p className="mt-1 text-gray-700 dark:text-gray-300">{reply || 'Brak odpowiedzi'}</p>
        </div>
      </div>
    </div>
  );
};

export default ArchivedRequestModal;
