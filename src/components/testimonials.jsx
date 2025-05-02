import React from 'react';
import { Star } from 'lucide-react';
import TestimonialCard from './testimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'HR Director',
      company: 'TechCorp Solutions',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'TalentHub has transformed our hiring process. We\'ve reduced time-to-hire by 40% and found exceptional candidates who truly fit our company culture.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      position: 'Software Engineer',
      company: 'Recently hired at DevForge',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'After months of searching on other platforms, I found my dream job through TalentHub in just two weeks. The matching algorithm really works!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      position: 'Talent Acquisition Manager',
      company: 'Innovative Health',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: 'The analytics and reporting features give us incredible insights into our recruitment funnel. We can now make data-driven decisions that have improved our hiring outcomes.',
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-10 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from companies and candidates who have found their perfect match on our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              position={testimonial.position}
              company={testimonial.company}
              image={testimonial.image}
              content={testimonial.content}
              rating={testimonial.rating}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Join thousands of satisfied users who have found success on our platform</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium">
            Get Started For Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;