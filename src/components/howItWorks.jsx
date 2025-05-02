import React from 'react'
import { FileText, Search, CheckCheck, Calendar } from 'lucide-react';

export const HowItWorks = () => {

    const steps = [
        {
          icon: <FileText className="text-blue-600" size={32} />,
          title: 'Create Your Profile',
          description: 'Build your company profile or candidate resume with our easy-to-use tools.',
          color: 'blue'
        },
        {
          icon: <Search className="text-purple-600" size={32} />,
          title: 'Post or Search',
          description: 'Post job opportunities or search for positions that match your skills and interests.',
          color: 'purple'
        },
        {
          icon: <CheckCheck className="text-teal-600" size={32} />,
          title: 'Match & Connect',
          description: 'Our AI matching system connects you with the most compatible opportunities or candidates.',
          color: 'teal'
        },
        {
          icon: <Calendar className="text-amber-600" size={32} />,
          title: 'Schedule & Hire',
          description: 'Coordinate interviews, manage the hiring process, and welcome your new team member.',
          color: 'amber'
        }
      ];

  return (
    <section id="how-it-works" className=" py-10 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our streamlined process makes hiring and job hunting simple and effective
          </p>
        </div>
        
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-${step.color}-100 mb-6 relative z-10 shadow-sm`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
                
                {/* Step Number */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[black] dark:border-[1px] text-gray-500 font-medium text-sm absolute top-0 right-0 lg:static lg:mt-4">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
      
      </div>
    </section>
  )
}
