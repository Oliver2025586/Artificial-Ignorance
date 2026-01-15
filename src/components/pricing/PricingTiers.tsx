import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 10, yearly: 9 },
    description: 'Perfect for small teams getting started',
    features: [
      'AI Receptionist',
      '24/7 for 365 days',
      'Email support',
      'Analytics dashboard'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: { monthly: 40, yearly: 34 },
    description: 'For growing teams with more needs',
    features: [
      'AI Receptionist',
      '24/7 for 365 days',
      'Email support',
      'Analytics dashboard',
      'Advanced voice customization',
      'Priority email support'
    ],
    popular: true
  },
  {
    name: 'Growth',
    price: { monthly: 150, yearly: 128 },
    description: 'Scale your operations efficiently',
    features: [
      'AI Receptionist',
      '24/7 for 365 days',
      'Email support',
      'Analytics dashboard',
      'Premium voice options',
      'Priority support + Slack',
      'Custom integrations'
    ],
    popular: false
  },
  {
    name: 'Agency',
    price: { monthly: 499, yearly: 424 },
    description: 'For agencies managing multiple clients',
    features: [
      'AI Receptionist',
      '24/7 for 365 days',
      'Email support',
      'Analytics dashboard',
      'All premium features',
      '24/7 priority support',
      'Multi-tenant dashboard',
      'Reseller capabilities'
    ],
    popular: false
  }
];

export default function PricingTiers() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-neon-green">Perfect Plan</span>
          </h2>

          <div className="inline-flex items-center gap-4 bg-gray-900 rounded-full p-1 border border-gray-800">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                !isYearly
                  ? 'bg-neon-green text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isYearly
                  ? 'bg-neon-green text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-neon-green/20 text-neon-green px-2 py-0.5 rounded-full">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? 'border-neon-green shadow-lg shadow-neon-green/20'
                  : 'border-gray-800 hover:border-neon-green/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-green text-black text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{plan.description}</p>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    £{isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`block w-full py-3 rounded-lg font-semibold transition-all duration-200 text-center ${
                  plan.popular
                    ? 'clean-button-primary'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border-2 border-gray-700 hover:border-neon-green/50'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
