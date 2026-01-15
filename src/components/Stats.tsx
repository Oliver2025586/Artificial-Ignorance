import { Users, MessageSquare, Clock, Globe } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Business Owners',
    description: 'Trusting AI to never miss a lead'
  },
  {
    icon: MessageSquare,
    value: '10M+',
    label: 'Conversations',
    description: 'Handled without lifting a finger'
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Always On',
    description: 'Your AI never takes a day off'
  },
  {
    icon: Globe,
    value: '40+',
    label: 'Languages',
    description: 'Talk to anyone, anywhere'
  }
];

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 px-6 sm:px-8 lg:px-12 bg-white border-y-2 border-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center scroll-animate ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-black border-2 border-neon-green mb-4">
                  <Icon size={24} className="text-neon-green" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-black mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-black">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
