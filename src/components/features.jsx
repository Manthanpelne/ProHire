import React from 'react';
import { Zap, PieChart, Clock, UserCheck, Building2, Search } from 'lucide-react';
import FeatureCard from './featuresCard';



const Features = () => {
  const features = [
    {
      icon: <Search size={24} />,
      title: 'Smart Matching',
      description: 'Our AI-powered matching algorithm connects candidates with the most relevant job opportunities based on skills and experience.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Time-Saving Tools',
      description: 'Automated screening and scheduling tools reduce time-to-hire by up to 50%, letting you focus on what matters.'
    },
    {
      icon: <PieChart size={24} />,
      title: 'Detailed Analytics',
      description: 'Gain insights into your hiring process with comprehensive analytics and reporting features.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Streamlined Process',
      description: 'From job posting to onboarding, our platform simplifies every step of the hiring journey.'
    },
    {
      icon: <Building2 size={24} />,
      title: 'Employer Branding',
      description: 'Showcase your company culture and values to attract the right talent for your team.'
    },
    {
      icon: <UserCheck size={24} />,
      title: 'Candidate Management',
      description: 'Organize applicants, track progress, and collaborate with your team in one centralized location.'
    }
  ];

  return (
    <section id="features" className="py-10 md:py-20 bg-white dark:bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Powerful Hiring Features</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our platform offers everything you need to streamline your recruitment process and find the perfect candidates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;