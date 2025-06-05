import React from 'react';
import {
  SparklesIcon,
  FireIcon,
  ClockIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';

const iconMap = {
  Detailing: SparklesIcon,
  Drift: FireIcon,
  Klasyki: ClockIcon,
  Offroad: GlobeAltIcon,
  'Samochody Elektryczne': BoltIcon,
  Tuning: WrenchScrewdriverIcon,
};

const GroupCard = ({ name, description, slug }) => {
  const Icon = iconMap[name] || WrenchScrewdriverIcon;

  const handleClick = () => {
    window.location.href = `/groups/${slug}`;
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-64 border border-[#b87333] rounded p-4 flex flex-col items-center justify-start gap-2 text-center
                 bg-gray-100 text-gray-900 hover:bg-[#b87333]/6
                 dark:bg-gray-800 dark:text-white dark:hover:bg-[#b87333]/4
                 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200 cursor-pointer"
    >
      <Icon className="w-8 h-8 text-[#b87333] transition-transform duration-300 group-hover:rotate-6" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default GroupCard;
