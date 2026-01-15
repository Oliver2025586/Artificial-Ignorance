import { useState } from 'react';
import { Zap, Phone, MessageSquare, Mail, Calendar, Clock } from 'lucide-react';

const automationScenarios = [
  {
    id: 'call',
    icon: Phone,
    title: 'AI Calling',
    description: 'Make thousands of personalized calls at once',
    stats: { speed: '1000+/hr', accuracy: '99.8%', uptime: '99.9%' }
  },
  {
    id: 'sms',
    icon: MessageSquare,
    title: 'SMS & Voice Messages',
    description: 'Send voice messages that sound natural, at scale',
    stats: { speed: '5000+/hr', accuracy: '99.9%', uptime: '99.9%' }
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Voice Email Replies',
    description: 'Turn emails into voice responses automatically',
    stats: { speed: '2000+/hr', accuracy: '99.5%', uptime: '99.9%' }
  },
  {
    id: 'appointment',
    icon: Calendar,
    title: 'Smart Reminders',
    description: 'Voice reminders with confirmation built-in',
    stats: { speed: '3000+/hr', accuracy: '99.7%', uptime: '99.9%' }
  }
];

export default function AutomationDemo() {
  const [activeScenario, setActiveScenario] = useState(automationScenarios[0].id);

  const active = automationScenarios.find(s => s.id === activeScenario) || automationScenarios[0];

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black border-2 border-neon-green rounded-full px-4 py-2 mb-6">
            <Zap size={16} className="text-neon-green" />
            <span className="text-sm font-medium text-white">Automation at Scale</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6">
            Automate <span className="text-neon-green">Everything</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Customer support. Marketing campaigns. Follow-ups. All automated.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {automationScenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenario(scenario.id)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeScenario === scenario.id
                      ? 'bg-neon-green/10 border-neon-green shadow-lg'
                      : 'bg-white border-black hover:border-neon-green'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-colors duration-300 ${
                      activeScenario === scenario.id
                        ? 'bg-neon-green/20 border-neon-green'
                        : 'bg-black border-black'
                    }`}>
                      <Icon size={24} className={activeScenario === scenario.id ? 'text-neon-green' : 'text-black'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black mb-1">{scenario.title}</h3>
                      <p className="text-sm text-black">{scenario.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <div className="clean-card p-8 sm:p-10 h-full">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-black border-2 border-neon-green flex items-center justify-center">
                  {(() => {
                    const Icon = active.icon;
                    return <Icon size={32} className="text-neon-green" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">{active.title}</h3>
                  <p className="text-black">{active.description}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border-2 border-black mb-8">
                <div className="flex items-center gap-2 text-neon-green mb-4">
                  <Clock size={18} />
                  <span className="text-sm font-medium">Live Performance Metrics</span>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-black mb-2">Processing Speed</p>
                    <p className="text-3xl font-bold text-black">{active.stats.speed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black mb-2">Accuracy Rate</p>
                    <p className="text-3xl font-bold text-black">{active.stats.accuracy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black mb-2">Uptime</p>
                    <p className="text-3xl font-bold text-black">{active.stats.uptime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-black rounded-xl p-6 text-white border-2 border-neon-green">
                <p className="text-sm text-white mb-3 font-mono">Sample Workflow</p>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-neon-green">1.</span>
                    <span>Trigger: New customer sign-up detected</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neon-green">2.</span>
                    <span>Action: Generate personalized welcome message</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neon-green">3.</span>
                    <span>Voice: Convert to AI voice with emotion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neon-green">4.</span>
                    <span>Deliver: Send via preferred channel</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-neon-green">
                    <span className="text-neon-green">✓</span>
                    <span className="text-neon-green">Complete: Customer engaged automatically</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
