import { ArrowRight, Shield, Zap, Users, Headphones } from 'lucide-react';

const enterpriseFeatures = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Advanced security features and compliance'
  },
  {
    icon: Zap,
    title: 'Unlimited Scale',
    description: 'No limits on usage or API calls'
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description: 'Personal account manager and support'
  },
  {
    icon: Headphones,
    title: '24/7 Premium Support',
    description: 'Round-the-clock assistance when you need it'
  }
];

export default function EnterpriseSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-gray-800/50 to-black border-2 border-neon-green/30 rounded-3xl p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,255,0,0.1),transparent_50%)]"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Need an <span className="text-neon-green">Enterprise</span> Solution?
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Custom plans designed for large organizations with specific requirements and unlimited scale
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {enterpriseFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-black/50 border border-gray-700 rounded-xl p-6 hover:border-neon-green/50 transition-all duration-300"
                >
                  <feature.icon className="w-10 h-10 text-neon-green mb-4 mx-auto" />
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>

            <button className="clean-button-primary px-8 py-4 text-lg font-semibold inline-flex items-center gap-2 group">
              Contact Sales
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-sm text-gray-400 mt-6">
              Get a personalized quote tailored to your needs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
