import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, leftSidebar = null }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4">

        {/* Lewa kolumna – tylko jeśli została przekazana */}
        {leftSidebar && (
          <aside className="col-span-1 hidden md:block">
            {leftSidebar}
          </aside>
        )}

        {/* Główna treść – rozszerzamy na 3 kolumny, jeśli nie ma menu */}
        <main className={leftSidebar ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-4"}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
