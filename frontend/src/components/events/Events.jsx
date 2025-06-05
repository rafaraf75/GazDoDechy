import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import RightSidebar from '../chat/RightSidebar';
import CalendarView from './CalendarView';
import EventForm from './EventForm';
import EventList from './EventList';
import Hero from '../common/Hero';

const Events = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdmin, setIsAdmin] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventAdded = () => {
    setRefreshEvents(prev => !prev);
  };

  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <div className="space-y-6">
        <Hero slug="events" />
        <div className="flex flex-col lg:flex-row gap-6 bg-white dark:bg-gray-800 p-6 rounded border border-[#b87333] shadow">
          {/* Nowy kalendarz */}
          <div className="w-full lg:w-1/3">
            <CalendarView onDateSelect={handleDateChange} selectedDate={selectedDate} />
          </div>

          {/* Lista wydarzeń */}
          <div className="w-full lg:w-2/3 lg:ml-48">
            <EventList selectedDate={selectedDate} key={refreshEvents} />
          </div>
        </div>

        {/* Formularz tylko dla admina */}
        {isAdmin && (
          <div className="mt-6">
            <EventForm onEventAdded={handleEventAdded} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;
