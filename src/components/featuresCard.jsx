import React from 'react';


const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-[black]/50 p-6 rounded-xl textbox flex flex-col">
      <div className="p-3 bg-blue-50 dark:bg-[#1f1c1c] text-blue-600 rounded-lg w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

export default FeatureCard;