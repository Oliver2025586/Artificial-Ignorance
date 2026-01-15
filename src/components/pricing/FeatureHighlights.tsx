import { Zap, Code, Gauge, Shield, Phone, Globe, Cpu } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const topFeatures = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-100ms response times for real-time conversations'
  },
  {
    icon: Code,
    title: 'Developer First',
    description: 'RESTful API with SDKs in 8+ languages'
  },
  {
    icon: Gauge,
    title: 'Auto-Scale',
    description: 'Handle millions of calls without configuration'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC2 compliant with end-to-end encryption'
  }
];

const bottomFeatures = [
  {
    icon: Phone,
    title: 'Natural Conversations',
    description: 'Our AI voices are trained on millions of real conversations, delivering human-like interactions that customers trust. Advanced speech synthesis ensures perfect pronunciation, natural intonation, and context-aware responses.',
    badge: 'Voice Quality'
  },
  {
    icon: Globe,
    title: 'Global Infrastructure',
    description: 'Deploy across 15+ regions worldwide with automatic failover and load balancing. Your voice agents stay online 24/7 with 99.99% uptime SLA, backed by redundant systems and real-time monitoring.',
    badge: 'Reliability'
  },
  {
    icon: Cpu,
    title: 'Smart Integrations',
    description: 'Connect seamlessly with your existing tools through webhooks, native integrations, and custom API endpoints. Sync data with CRMs, support systems, and databases in real-time without writing complex code.',
    badge: 'Connectivity'
  }
];

export default function FeatureHighlights() {
  const scrollRef = useScrollAnimation();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {topFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-black/40 border border-gray-800 rounded-2xl p-6 hover:border-neon-green/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors">
                <feature.icon className="w-6 h-6 text-neon-green" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="relative mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        </div>

        <div ref={scrollRef} className="space-y-8">
          {bottomFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl p-8 hover:border-neon-green/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-neon-green/10 rounded-xl flex items-center justify-center group-hover:bg-neon-green/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-neon-green" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-white font-bold text-xl">{feature.title}</h3>
                    <span className="text-xs font-medium text-neon-green bg-neon-green/10 px-3 py-1 rounded-full">
                      {feature.badge}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-neon-green/5 border border-neon-green/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">All plans include these features</span>
          </div>
        </div>
      </div>
    </section>
  );
}
