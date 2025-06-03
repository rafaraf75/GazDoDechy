import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import EventDetailsModal from './EventDetailModal';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Błąd pobierania wydarzeń:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateSelect = (date) => {
    if (!date || isNaN(date.getTime())) return;
    setSelectedDate(date);
    const dateStr = format(date, 'yyyy-MM-dd');
    const matchingEvent = events.find((event) => event.date === dateStr);

    if (matchingEvent) {
      setSelectedEvent(matchingEvent);
      setShowModal(true);
    }
  };

  const modifiers = {
    hasEvent: events.map((e) => {
        const d = new Date(e.date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }),
  };

  const modifiersClassNames = {
    hasEvent: 'bg-blue-600 text-white rounded-full',
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Zloty i wydarzenia</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Wybierz datę i zobacz zaplanowane wydarzenia.
      </p>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow min-w-[340px] overflow-visible">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          locale={pl}
          className="text-sm"
        />
      </div>

      {showModal && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => {
            setShowModal(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default CalendarView;
