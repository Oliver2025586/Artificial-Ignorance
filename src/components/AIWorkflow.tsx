import { Phone, MessageSquare, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const workflowSteps = [
  {
    icon: Phone,
    title: 'Lead Calls In',
    description: 'Someone reaches out—phone, text, or WhatsApp. Day or night, doesn\'t matter.',
    color: 'neon-green'
  },
  {
    icon: MessageSquare,
    title: 'AI Picks Up',
    description: 'Your AI answers instantly, qualifies them in real-time, and handles every question like a pro.',
    color: 'neon-green'
  },
  {
    icon: Calendar,
    title: 'Meeting Scheduled',
    description: 'AI books the appointment straight into your calendar. No email tennis, no confusion.',
    color: 'neon-green'
  },
  {
    icon: CheckCircle,
    title: 'Deal Closed or Delivered',
    description: 'AI either closes the sale or sends you a hot lead, ready to close. You decide.',
    color: 'neon-green'
  }
];

export default function AIWorkflow() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 px-6 sm:px-8 lg:px-12 bg-white relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 scroll-animate ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6">
            How It <span className="text-neon-green">Actually Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-black max-w-3xl mx-auto">
            From first contact to closed deal—automatically. Here\'s the play-by-play.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`scroll-animate ${isVisible ? 'visible' : ''} relative`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="clean-card p-6 h-full hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black border-2 border-neon-green flex items-center justify-center group-hover:bg-neon-green group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-neon-green group-hover:text-black transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-neon-green font-bold text-lg">Step {index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-black mb-2">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-black leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                    <ArrowRight size={32} className="text-neon-green" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`text-center scroll-animate ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <div className="inline-block bg-black border-2 border-neon-green rounded-2xl p-8">
            <p className="text-xl sm:text-2xl font-bold text-white mb-2">
              The Result? <span className="text-neon-green">More Sales. Less Work.</span>
            </p>
            <p className="text-white">
              Your AI works 24/7. Never sleeps. Never misses a beat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
