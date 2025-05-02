import React from 'react';
import { Check } from 'lucide-react';
import PricingCard from './pricingCard';


const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: 'per month',
      description: 'Perfect for small businesses and startups',
      features: [
        'Post up to 5 jobs',
        'Basic candidate matching',
        'Email support',
        'Standard job listing',
        'Basic analytics'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      description: 'Ideal for growing companies',
      features: [
        'Post up to 15 jobs',
        'Advanced AI matching',
        'Priority email & chat support',
        'Featured job listings',
        'Comprehensive analytics',
        'Candidate tracking system',
        'Team collaboration tools'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact for pricing',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited job postings',
        'Premium AI matching',
        '24/7 dedicated support',
        'Featured & promoted listings',
        'Advanced analytics & reporting',
        'Full ATS integration',
        'Custom branding',
        'API access'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your hiring needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              cta={plan.cta}
              highlighted={plan.highlighted}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Not sure which plan is right for you?</p>
          <a href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
            Schedule a demo to learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;