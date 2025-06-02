import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import ArchivedRequestModal from '../help/ArchivedRequestModal';

const MechanicRequestAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [archived, setArchived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [selectedArchived, setSelectedArchived] = useState(null);
  const [selectedReply, setSelectedReply] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/mechanic-request');
        setRequests(res.data || []);
      } catch (err) {
        console.error('Błąd pobierania zgłoszeń:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchArchived = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/mechanic-request/archived');
        setArchived(res.data || []);
      } catch (err) {
        console.error('Błąd pobierania zarchiwizowanych zgłoszeń:', err);
      }
    };

    fetchRequests();
    fetchArchived();
  }, []);

  const getImageUrls = (data) => {
    if (Array.isArray(data)) return data;
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const handleReplyClick = (id) => {
    setReplyingTo(id);
    setReplyContent('');
  };

  const handleReplySubmit = async (id) => {
    try {
      // 1. Wyślij odpowiedź
      await axios.post('http://localhost:5000/api/mechanic-replies', {
        request_id: id,
        reply: replyContent,
      });

      // 2. Zarchiwizuj zgłoszenie
      await axios.patch(`http://localhost:5000/api/mechanic-request/${id}/archive`);

      // 3. Przenieś do zarchiwizowanych lokalnie
      const archivedRequest = requests.find((r) => r.id === id);
      if (archivedRequest) {
        setArchived((prev) => [...prev, { ...archivedRequest, is_archived: true }]);
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }

      // 4. Resetuj stan formularza
      setReplyingTo(null);
      setReplyContent('');

      // 5. Pokaż potwierdzenie
      alert('Wiadomość wysłana i zgłoszenie zostało zarchiwizowane.');
    } catch (err) {
      console.error('Błąd wysyłania odpowiedzi:', err);
      alert('Nie udało się wysłać odpowiedzi.');
    }
  };

  const handleArchivedClick = async (request) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/mechanic-replies/${request.id}`);
    setSelectedReply(res.data.reply);
  } catch (err) {
    console.warn('Nie udało się pobrać odpowiedzi:', err);
    setSelectedReply('Brak odpowiedzi');
  }
  setSelectedArchived(request);
};

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Zgłoszenia do mechanika
      </h1>

      <h2 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">Aktywne</h2>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Ładowanie zgłoszeń...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Brak aktywnych zgłoszeń.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p className="text-sm text-gray-400">Dodane: {new Date(req.created_at).toLocaleString()}</p>
              <p><strong>Użytkownik:</strong> {req.name}</p>
              <p><strong>Telefon:</strong> {req.phone || 'Brak'}</p>
              <p><strong>Pojazd:</strong> {req.brand} {req.model} ({req.year})</p>
              <p><strong>Silnik:</strong> {req.engine}</p>
              <p><strong>Skrzynia:</strong> {req.gearbox}</p>
              <p className="mt-2"><strong>Opis:</strong> {req.description}</p>

              {getImageUrls(req.image_urls).length > 0 && (
                <div className="flex gap-3 mt-3 flex-wrap">
                  {getImageUrls(req.image_urls).map((url, i) => (
                    <img key={i} src={url} alt={`img-${i}`} className="w-32 rounded border" />
                  ))}
                </div>
              )}

              {replyingTo === req.id ? (
                <div className="mt-4">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Wpisz odpowiedź..."
                  />
                  <button
                    onClick={() => handleReplySubmit(req.id)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Wyślij odpowiedź
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleReplyClick(req.id)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Odpowiedz
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Zarchiwizowane</h2>
      {archived.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Brak zarchiwizowanych zgłoszeń.</p>
      ) : (
        <div className="space-y-2">
          {archived.map((req) => (
          <div
            key={req.id}
            onClick={() => handleArchivedClick(req)}
            className="bg-gray-100 dark:bg-gray-700 p-3 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Zgłoszenie od <strong>{req.name}</strong> ({req.brand} {req.model}, {req.year}) zostało zarchiwizowane.
            </p>
          </div>
        ))}
        </div>
      )}
      {selectedArchived && (
        <ArchivedRequestModal
          request={selectedArchived}
          reply={selectedReply}
          onClose={() => setSelectedArchived(null)}
        />
      )}
    </Layout>
  );
};

export default MechanicRequestAdmin;
