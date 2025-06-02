import React, { useState } from 'react';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import MechanicRequestForm from './MechanicRequestForm';
import Hero from '../common/Hero';

const LiveHelp = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <Hero slug="help" />
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Napisz do mechanikia</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">Dostępność: Pon–Pt 10:00–18:00</p>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? 'Zamknij formularz' : 'Wyślij zgłoszenie'}
          </button>

          {showForm && (
            <div className="mt-4">
              <MechanicRequestForm
                onSuccess={() => {
                  setShowForm(false);
                  alert('Zgłoszenie przyjęte! Mechanik skontaktuje się z Tobą dziś lub jutro.');
                }}
              />
            </div>
          )}
        </div>
       <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Wideo konsultacja</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">
            Porozmawiaj bezpośrednio z mechanikiem przez WhatsApp
          </p>
          <a
            href="https://wa.me/34623306850?text=Cześć%2C%20chciałbym%20umówić%20się%20na%20wideorozmowę%20z%20mechanikiem."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Zadzwoń przez WhatsApp
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default LiveHelp;
