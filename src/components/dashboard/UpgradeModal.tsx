import { X, Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

const PLANS = [
  {
    name: 'Starter',
    price: { monthly: 10, yearly: 9 },
    description: 'Perfect for small teams',
    features: [
      'AI Receptionist',
      '24/7 for 365 days',
      'Email support',
      'Analytics dashboard'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: { monthly: 40, yearly: 34 },
    description: 'For growing teams',
    features: [
      'Everything in Starter',
      'Advanced voice customization',
      'Priority email support',
      'Custom integrations'
    ],
    popular: true
  },
  {
    name: 'Growth',
    price: { monthly: 150, yearly: 128 },
    description: 'Scale your operations',
    features: [
      'Everything in Professional',
      'Premium voice options',
      'Priority support + Slack',
      'Unlimited integrations'
    ],
    popular: false
  },
  {
    name: 'Agency',
    price: { monthly: 499, yearly: 424 },
    description: 'For agencies',
    features: [
      'Everything in Growth',
      '24/7 priority support',
      'Multi-tenant dashboard',
      'Reseller capabilities'
    ],
    popular: false
  }
];

export default function UpgradeModal({ isOpen, onClose, feature }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <Zap className="w-6 h-6 text-neon-green" />
              Upgrade Required
            </h2>
            {feature && (
              <p className="text-zinc-400 text-sm">
                This feature is available on paid plans
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`bg-zinc-800/30 border-2 rounded-xl p-6 relative transition-all hover:scale-[1.02] ${
                  plan.popular
                    ? 'border-neon-green shadow-lg shadow-neon-green/20'
                    : 'border-zinc-700 hover:border-zinc-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-neon-green to-emerald-400 text-black text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mb-3">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">£{plan.price.monthly}</span>
                    <span className="text-zinc-400 text-sm">/month</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs">
                      <Check className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/dashboard/billing"
                  onClick={onClose}
                  className={`block w-full py-2.5 rounded-lg font-semibold transition-all text-center text-sm ${
                    plan.popular
                      ? 'bg-gradient-to-r from-neon-green to-emerald-400 text-black hover:scale-[1.02]'
                      : 'bg-zinc-700 hover:bg-zinc-600 text-white'
                  }`}
                >
                  Select Plan
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
