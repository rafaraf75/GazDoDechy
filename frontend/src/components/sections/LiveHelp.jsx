import React from 'react';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';

const LiveHelp = () => {
  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Porady online</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Potrzebujesz pomocy od mechanika? Skontaktuj się z naszymi ekspertami!
      </p>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Czat z mechanikiem</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">Dostępność: Pon–Pt 10:00–18:00</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Rozpocznij czat
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Wideo konsultacja</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">Umów się na wideorozmowę z doradcą</p>
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Zarezerwuj termin
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LiveHelp;