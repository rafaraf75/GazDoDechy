import React from 'react';

const Layout = ({ children, leftSidebar = null, rightSidebar = null }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
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
