import { AlertCircle, Target, Zap, Brain, Phone, TrendingUp, Users, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: AlertCircle,
    title: 'The Problem',
    subtitle: 'Too Much Manual Work',
    description: 'Your team spends hours on repetitive calls and follow-ups. Leads slip through. Opportunities disappear.',
    highlighted: true
  },
  {
    icon: Target,
    title: 'Smart Qualification',
    subtitle: 'AI Filters the Noise',
    description: 'Qualify leads automatically using your criteria. Only serious buyers make it through.',
    highlighted: false
  },
  {
    icon: Brain,
    title: 'Natural Conversations',
    subtitle: 'Sounds Actually Human',
    description: 'AI that understands context, handles objections, and talks like a real person.',
    highlighted: false
  },
  {
    icon: Phone,
    title: 'Always Available',
    subtitle: 'Never Miss Anything',
    description: 'Handle unlimited calls simultaneously. Day or night. Weekends. Holidays. Always on.',
    highlighted: false
  },
  {
    icon: Zap,
    title: 'Ready in Minutes',
    subtitle: 'No Tech Skills Needed',
    description: 'Set up your AI agent in under 5 minutes. Seriously. No developer required.',
    highlighted: false
  },
  {
    icon: TrendingUp,
    title: 'Know Everything',
    subtitle: 'Real-Time Analytics',
    description: 'Track every conversation. See what\'s working. Optimize as you go.',
    highlighted: false
  },
  {
    icon: Users,
    title: 'Smart Handoffs',
    subtitle: 'Human When You Need It',
    description: 'Transfer tricky calls to your team with full context. No re-explaining needed.',
    highlighted: false
  },
  {
    icon: Sparkles,
    title: 'Gets Smarter',
    subtitle: 'Learns as It Goes',
    description: 'Your AI improves with every call. More data, better results.',
    highlighted: false
  }
];

export default function FeatureGrid() {
  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            How We <span className="text-neon-green">Fix This</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From chaotic to automated. From reactive to unstoppable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`group relative flex-1 p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  feature.highlighted
                    ? 'bg-red-50 border-red-500/50 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30'
                    : 'bg-white border-neon-green hover:border-neon-green hover:shadow-2xl hover:shadow-neon-green/30'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  feature.highlighted
                    ? 'bg-red-500/20 border-2 border-red-500/30'
                    : 'bg-neon-green/10 border-2 border-neon-green/30'
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.highlighted ? 'text-red-400' : 'text-neon-green'
                  }`} />
                </div>

                <h3 className={`text-lg font-bold mb-2 ${
                  feature.highlighted ? 'text-red-700' : 'text-black'
                }`}>
                  {feature.title}
                </h3>

                <p className={`text-sm font-medium mb-3 ${
                  feature.highlighted ? 'text-red-600' : 'text-neon-green'
                }`}>
                  {feature.subtitle}
                </p>

                <p className="text-sm text-black leading-relaxed">
                  {feature.description}
                </p>

                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  feature.highlighted
                    ? 'bg-gradient-to-br from-red-500/5 to-transparent'
                    : 'bg-gradient-to-br from-neon-green/5 to-transparent'
                }`}></div>
              </div>

              {index < 3 && (
                <ArrowRight className="hidden lg:block w-6 h-6 text-neon-green flex-shrink-0 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.slice(4).map((feature, index) => (
            <div key={index + 4} className="flex items-center gap-4">
              <div
                className="group relative flex-1 p-6 bg-white rounded-2xl border-2 border-neon-green hover:border-neon-green hover:shadow-2xl hover:shadow-neon-green/30 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex p-3 rounded-xl bg-neon-green/10 border-2 border-neon-green/30 mb-4">
                  <feature.icon className="w-6 h-6 text-neon-green" />
                </div>

                <h3 className="text-lg font-bold text-black mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm font-medium text-neon-green mb-3">
                  {feature.subtitle}
                </p>

                <p className="text-sm text-black leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {index < 3 && (
                <ArrowRight className="hidden lg:block w-6 h-6 text-neon-green flex-shrink-0 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green/10 border-2 border-neon-green/30 rounded-full">
            <Sparkles className="w-5 h-5 text-neon-green animate-pulse" />
            <span className="text-neon-green font-medium">
              Everything you need. One platform.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
