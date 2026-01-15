import { useState } from 'react';
import { ChevronDown, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createGHLContact } from '../utils/gohighlevel';

interface LeadData {
  industry: string;
  serviceNeed: string;
  challenge: string;
  name: string;
  email: string;
  phone: string;
}

const industries = [
  'Real Estate',
  'Healthcare',
  'SaaS / Tech',
  'E-commerce',
  'Call Centers',
  'Agencies',
  'Education'
];

const serviceNeeds = [
  { label: 'More Sales Leads', icon: '📈' },
  { label: 'Better Google Reviews', icon: '⭐' },
  { label: 'AI Virtual Assistant', icon: '🤖' },
  { label: 'CRM Setup & Automation', icon: '⚙️' },
  { label: 'Customer Service Center', icon: '💬' },
  { label: 'Retention & Follow-Up System', icon: '🔄' }
];

const challenges = [
  'Low Conversion Rates',
  'Manual Follow-Ups',
  'Poor Lead Quality',
  'I\'m just exploring'
];

export default function LeadFunnel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleIndustrySelect = (industry: string) => {
    setLeadData({ ...leadData, industry });
    setTimeout(() => setCurrentStep(2), 300);
  };

  const handleServiceSelect = (service: string) => {
    setLeadData({ ...leadData, serviceNeed: service });
    setTimeout(() => setCurrentStep(3), 300);
  };

  const handleChallengeSelect = (challenge: string) => {
    setLeadData({ ...leadData, challenge });
    setTimeout(() => setCurrentStep(4), 300);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const finalData: LeadData = {
      ...leadData as LeadData,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string
    };

    try {
      const { error } = await supabase
        .from('funnel_leads')
        .insert([{
          industry: finalData.industry,
          service_need: finalData.serviceNeed,
          challenge: finalData.challenge,
          name: finalData.name,
          email: finalData.email,
          phone: finalData.phone,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      await createGHLContact({
        name: finalData.name,
        email: finalData.email,
        phone: finalData.phone,
        source: 'Lead Funnel Form',
        industry: finalData.industry,
        serviceNeed: finalData.serviceNeed,
        challenge: finalData.challenge,
      });

      setIsComplete(true);
      setTimeout(() => {
        window.location.href = '/signup';
      }, 2000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <section className="py-20 px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-green/20 border-2 border-neon-green mb-6 animate-pulse">
              <CheckCircle className="w-10 h-10 text-neon-green" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Perfect! We're Preparing Your Demo
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              Redirecting you to get started...
            </p>
            <div className="flex justify-center">
              <Loader className="w-8 h-8 text-neon-green animate-spin" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your <span className="text-neon-green">Perfect Solution</span>
          </h2>
          <p className="text-xl text-gray-400">
            Answer a few quick questions to get a personalized demo
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-neon-green">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-green to-green-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-white mb-6">
                What industry are you in?
              </h3>
              <div className="relative">
                <select
                  className="w-full bg-black border-2 border-gray-700 rounded-lg px-6 py-4 text-white text-lg appearance-none cursor-pointer hover:border-neon-green focus:border-neon-green focus:outline-none transition-all"
                  onChange={(e) => e.target.value && handleIndustrySelect(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your industry...
                  </option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-white mb-6">
                Where do you need help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceNeeds.map((service) => (
                  <button
                    key={service.label}
                    onClick={() => handleServiceSelect(service.label)}
                    className="group bg-black border-2 border-gray-700 rounded-xl p-6 text-left hover:border-neon-green hover:bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neon-green/20"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <div className="font-semibold text-white group-hover:text-neon-green transition-colors">
                          {service.label}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-white mb-6">
                What's your biggest challenge right now?
              </h3>
              <div className="space-y-3">
                {challenges.map((challenge) => (
                  <button
                    key={challenge}
                    onClick={() => handleChallengeSelect(challenge)}
                    className="w-full bg-black border-2 border-gray-700 rounded-lg px-6 py-4 text-left text-white hover:border-neon-green hover:bg-gray-900 transition-all duration-300 hover:translate-x-2 font-medium"
                  >
                    <div className="flex items-center justify-between">
                      <span>{challenge}</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-neon-green" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's get you your custom demo
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-black border-2 border-gray-700 rounded-lg px-6 py-4 text-white focus:border-neon-green focus:outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-black border-2 border-gray-700 rounded-lg px-6 py-4 text-white focus:border-neon-green focus:outline-none transition-all"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full bg-black border-2 border-gray-700 rounded-lg px-6 py-4 text-white focus:border-neon-green focus:outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-green text-black font-bold py-4 rounded-lg hover:bg-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Show My AI Demo
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to receive communications from us. We respect your privacy.
              </p>
            </div>
          )}
        </div>

        {currentStep > 1 && !isComplete && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mt-6 text-gray-400 hover:text-neon-green transition-colors mx-auto block"
          >
            ← Go back
          </button>
        )}
      </div>
    </section>
  );
}
