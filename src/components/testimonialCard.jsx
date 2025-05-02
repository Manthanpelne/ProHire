import React from 'react';
import { Star } from 'lucide-react';


const TestimonialCard = ({
  name,
  position,
  company,
  image,
  content,
  rating
}) => {
  return (
    <div className="bg-white dark:bg-black/50 p-6 rounded-xl textbox dark:border-none  hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
      </div>
      
      <p className="text-gray-600 dark:text-gray-500 mb-6 italic">"{content}"</p>
      
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-300">{name}</h4>
          <p className="text-gray-500 text-sm">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;