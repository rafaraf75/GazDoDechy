import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Layout = ({ children, leftSidebar = null, rightSidebar = null }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 px-4 mt-6">
        {/* Lewy sidebar */}
        {leftSidebar && (
          <aside className="col-span-1 hidden md:block">
            {leftSidebar}
          </aside>
        )}

        {/* Główna treść */}
        <main className={leftSidebar && rightSidebar ? "col-span-2" : "col-span-3"}>
          {children}
        </main>

        {/* Prawy sidebar – czat */}
        {rightSidebar && (
          <aside className="col-span-1 hidden md:block">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  );
};

export default Layout;
