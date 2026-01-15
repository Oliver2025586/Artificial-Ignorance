import { Check, X } from 'lucide-react';

const features = [
  {
    category: 'Voice Features',
    items: [
      { name: 'Voice customization', starter: true, pro: true, growth: true, agency: true },
      { name: 'Premium voices', starter: false, pro: true, growth: true, agency: true },
      { name: 'Voice cloning', starter: false, pro: false, growth: true, agency: true },
      { name: 'Multi-language support', starter: true, pro: true, growth: true, agency: true }
    ]
  },
  {
    category: 'Integration & API',
    items: [
      { name: 'API access', starter: true, pro: true, growth: true, agency: true },
      { name: 'Webhook support', starter: false, pro: true, growth: true, agency: true },
      { name: 'Custom integrations', starter: false, pro: true, growth: true, agency: true },
      { name: 'White-label API', starter: false, pro: false, growth: true, agency: true }
    ]
  },
  {
    category: 'Support & Services',
    items: [
      { name: 'Email support', starter: true, pro: true, growth: true, agency: true },
      { name: 'Priority support', starter: false, pro: true, growth: true, agency: true },
      { name: 'Dedicated manager', starter: false, pro: false, growth: true, agency: true },
      { name: '24/7 support', starter: false, pro: false, growth: false, agency: true }
    ]
  },
  {
    category: 'Advanced Features',
    items: [
      { name: 'Analytics dashboard', starter: true, pro: true, growth: true, agency: true },
      { name: 'Advanced analytics', starter: false, pro: true, growth: true, agency: true },
      { name: 'Custom workflows', starter: false, pro: false, growth: true, agency: true },
      { name: 'Multi-tenant dashboard', starter: false, pro: false, growth: false, agency: true }
    ]
  }
];

const plans = ['Starter', 'Professional', 'Growth', 'Agency'];

export default function FeatureComparison() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Compare <span className="text-neon-green">All Features</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Find the perfect plan with the features you need
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-black z-10">
              <tr>
                <th className="text-left py-4 px-6 border-b-2 border-neon-green text-white font-semibold">
                  Features
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan}
                    className="text-center py-4 px-6 border-b-2 border-neon-green text-white font-semibold"
                  >
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((category, categoryIndex) => (
                <>
                  <tr key={`category-${categoryIndex}`}>
                    <td
                      colSpan={5}
                      className="py-4 px-6 bg-gray-900/50 text-neon-green font-semibold text-sm uppercase tracking-wide"
                    >
                      {category.category}
                    </td>
                  </tr>
                  {category.items.map((item, itemIndex) => (
                    <tr
                      key={`item-${categoryIndex}-${itemIndex}`}
                      className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
                    >
                      <td className="py-4 px-6 text-gray-300">{item.name}</td>
                      <td className="py-4 px-6 text-center">
                        {item.starter ? (
                          <Check className="w-5 h-5 text-neon-green mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.pro ? (
                          <Check className="w-5 h-5 text-neon-green mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.growth ? (
                          <Check className="w-5 h-5 text-neon-green mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.agency ? (
                          <Check className="w-5 h-5 text-neon-green mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
