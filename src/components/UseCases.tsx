import { ShoppingCart, Headphones, GraduationCap, Building2, Megaphone, HeartPulse } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const useCases = [
  {
    icon: ShoppingCart,
    title: 'Scaling Your Store',
    description: 'Turn browsers into buyers around the clock. Every question answered, every opportunity captured, every customer delighted.',
    benefits: ['Capture revenue 24/7', 'Zero wait times', 'Global reach, instant response']
  },
  {
    icon: Headphones,
    title: 'Managing Customer Expectations',
    description: 'Your customers get help the moment they need it. Common problems solved instantly. Complex issues routed to the right person.',
    benefits: ['Eliminate wait times', 'Consistent quality', 'Team focuses on what matters']
  },
  {
    icon: GraduationCap,
    title: 'Growing Your Impact',
    description: 'Serve more students without working more hours. Automated admin work means more time teaching, mentoring, and creating.',
    benefits: ['Scale without burnout', 'Students get instant help', 'Focus on high-impact work']
  },
  {
    icon: Building2,
    title: 'Closing More Deals',
    description: 'Stop chasing tire-kickers. Qualified leads booked and ready when you arrive. Your time spent only with serious buyers.',
    benefits: ['Higher conversion rates', 'Better use of your time', 'Professional 24/7 presence']
  },
  {
    icon: Megaphone,
    title: 'Moving Faster Than Competitors',
    description: 'Launch campaigns today, not next month. Test new ideas instantly. Respond to market changes at the speed of thought.',
    benefits: ['Ship campaigns faster', 'Test without limits', 'Slash production costs']
  },
  {
    icon: HeartPulse,
    title: 'Delivering Better Care',
    description: 'Keep patients on track with timely reminders and proactive check-ins. Better outcomes with less administrative burden.',
    benefits: ['Patients stay engaged', 'Fewer missed appointments', 'Compliant and secure']
  }
];

export default function UseCases() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-6 sm:px-8 lg:px-12 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 scroll-animate ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Real Problems, <span className="text-neon-green">Easy Solutions</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Whatever your challenge, there's a simple way to solve it. More capacity, better service, faster growth—without the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className={`group bg-black rounded-xl p-8 border-2 border-white hover:border-neon-green transition-all duration-300 hover:transform hover:scale-105 scroll-animate ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-black border-2 border-neon-green flex items-center justify-center mb-6 group-hover:bg-neon-green transition-all duration-300">
                  <Icon size={28} className="text-neon-green group-hover:text-black transition-colors duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors duration-300">
                  {useCase.title}
                </h3>

                <p className="text-white mb-6 leading-relaxed">
                  {useCase.description}
                </p>

                <div className="space-y-2">
                  {useCase.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div>
                      <span className="text-sm text-white">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
