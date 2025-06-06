import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Layout = ({ children, leftSidebar = null, rightSidebar = null }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar theme={theme} setTheme={setTheme} />
      </div>

      {/* Grid z marginesem odpowiadającym wysokości navbaru */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        {/* Lewy sidebar */}
        {leftSidebar && (
          <aside className="col-span-1 hidden md:block sticky top-[96px] h-[calc(100vh-96px)] overflow-y-auto">
            {leftSidebar}
          </aside>
        )}

        {/* Główna treść */}
        <main className={`${leftSidebar && rightSidebar ? "col-span-2" : "col-span-3"} pt-6`}>
          {children}
        </main>

        {/* Prawy sidebar */}
        {rightSidebar && (
          <aside className="col-span-1 hidden md:block sticky top-[96px] h-[calc(100vh-96px)] overflow-y-auto">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  );
};

export default Layout;
