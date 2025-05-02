import React from 'react';
import { Check } from 'lucide-react';


const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted
}) => {
  return (
    <div 
      className={`rounded-xl overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 ${
        highlighted 
          ? 'border-2 border-blue-500 shadow-xl relative z-10' 
          : ' shadow-sm'
      }`}
    >
      {highlighted && (
        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 bg-white dark:bg-black/50 h-full flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-300">{price}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">{period}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button 
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            highlighted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 dark:bg-black border text-gray-800 dark:text-gray-400 hover:bg-gray-200'
          }`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;