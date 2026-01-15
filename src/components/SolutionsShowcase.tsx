import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const solutionItems = [
  { name: 'Customer Service', path: '/solutions/customer-service', category: 'Use Cases' },
  { name: 'Receptionist', path: '/solutions/receptionist', category: 'Use Cases' },
  { name: 'Answering Service', path: '/solutions/answering-service', category: 'Use Cases' },
  { name: 'Concierge', path: '/solutions/concierge', category: 'Use Cases' },
  { name: 'Appointment Setter', path: '/solutions/appointment-setter', category: 'Use Cases' },
  { name: 'AI IVR', path: '/solutions/ai-ivr', category: 'Use Cases' },
  { name: 'WhatsApp Integration', path: '/solutions/whatsapp-integration', category: 'Use Cases' },
  { name: 'Customer Support', path: '/solutions/customer-support', category: 'Case Studies' },
  { name: 'Data Collection', path: '/solutions/data-collection', category: 'Case Studies' },
  { name: 'Inbound Calls', path: '/solutions/inbound-calls', category: 'Case Studies' },
  { name: 'Lead Reactivation', path: '/solutions/lead-reactivation', category: 'Case Studies' },
  { name: 'Sales Qualification', path: '/solutions/sales-qualification', category: 'Case Studies' },
  { name: 'Voice AI for CRM', path: '/solutions/voice-ai-crm', category: 'Case Studies' },
  { name: 'BPO & Call Center', path: '/solutions/bpo-call-center', category: 'Case Studies' },
  { name: 'IVR Optimization', path: '/solutions/ivr-optimization', category: 'Case Studies' },
  { name: 'BPO', path: '/solutions/bpo', category: 'Industries' },
  { name: 'Healthcare', path: '/solutions/healthcare', category: 'Industries' },
  { name: 'Mortgage', path: '/solutions/mortgage', category: 'Industries' },
  { name: 'Recruitment', path: '/solutions/recruitment', category: 'Industries' },
  { name: 'Car Dealership', path: '/solutions/car-dealership', category: 'Industries' },
  { name: 'Agency', path: '/solutions/agency', category: 'Industries' },
];

export default function SolutionsShowcase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 via-transparent to-transparent"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
            style={{
              color: '#00ff00',
              textShadow: '0 0 20px rgba(128, 0, 128, 0.3), 0 0 40px rgba(0, 255, 0, 0.2)',
            }}
          >
            SOLUTIONS
          </h2>
          <p
            className="text-2xl font-bold text-white"
            style={{ opacity: 0.9, fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Discover more
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {solutionItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className="group relative bg-white text-black rounded-xl px-6 py-4 font-semibold text-center transition-all duration-300 hover:scale-105 hover:bg-neon-green hover:text-white focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-2 focus:ring-offset-black shadow-lg hover:shadow-[0_0_30px_rgba(0,255,0,0.3)]"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span className="relative z-10">{item.name}</span>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-neon-green transition-all duration-300"></div>
            </Link>
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-white/60 text-sm">
            Explore our comprehensive suite of AI voice solutions tailored to your industry
          </p>
        </div>
      </div>
    </section>
  );
}
