import { useState, useEffect } from 'react';
import { CreditCard, Check, Loader2 } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { createCheckoutSession } from '../../utils/stripe';
import { supabase } from '../../lib/supabase';

const PLANS = [
  {
    name: 'Starter',
    price: { monthly: 10, yearly: 9 },
    priceId: { monthly: 'price_starter_monthly', yearly: 'price_starter_yearly' },
    description: 'Perfect for small teams',
    features: [
      'AI Receptionist',
      '24/7 for 365 days',
      'Email support',
      'Analytics dashboard',
      '50 AI calls/month',
      '3 integrations'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: { monthly: 40, yearly: 34 },
    priceId: { monthly: 'price_professional_monthly', yearly: 'price_professional_yearly' },
    description: 'For growing teams',
    features: [
      'Everything in Starter',
      'Advanced voice customization',
      'Priority email support',
      'Custom integrations',
      'Unlimited AI calls',
      'Unlimited integrations'
    ],
    popular: true
  },
  {
    name: 'Growth',
    price: { monthly: 150, yearly: 128 },
    priceId: { monthly: 'price_growth_monthly', yearly: 'price_growth_yearly' },
    description: 'Scale your operations',
    features: [
      'Everything in Professional',
      'Premium voice options',
      'Priority support + Slack',
      'Advanced analytics',
      'API access',
      'Dedicated support'
    ],
    popular: false
  },
  {
    name: 'Agency',
    price: { monthly: 499, yearly: 424 },
    priceId: { monthly: 'price_agency_monthly', yearly: 'price_agency_yearly' },
    description: 'For agencies',
    features: [
      'Everything in Growth',
      '24/7 priority support',
      'Multi-tenant dashboard',
      'Reseller capabilities',
      'White-label options',
      'Custom SLA'
    ],
    popular: false
  }
];

export default function BillingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const { user, session } = useAuth();

  useEffect(() => {
    if (user) {
      loadSubscription();
    }
  }, [user]);

  async function loadSubscription() {
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user?.id)
      .eq('status', 'active')
      .maybeSingle();

    setSubscription(data);
  }

  async function handleUpgrade(planName: string) {
    if (!session?.access_token) return;

    setLoading(planName);
    try {
      const plan = PLANS.find(p => p.name === planName);
      if (!plan) throw new Error('Plan not found');

      const billingPeriod = isYearly ? 'yearly' : 'monthly';
      const priceId = plan.priceId[billingPeriod];

      const { url } = await createCheckoutSession(
        { planName, billingPeriod, priceId },
        session.access_token
      );

      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Billing & Plans</h2>
          <p className="text-zinc-400">Manage your subscription and billing details</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Current Usage</h3>
              <p className="text-sm text-zinc-400">Free tier limits and usage</p>
            </div>
            <div className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-lg font-medium">
              Free Tier
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4">
              <p className="text-zinc-400 text-sm mb-1">AI Calls This Month</p>
              <p className="text-2xl font-bold text-white">0 / 20</p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4">
              <p className="text-zinc-400 text-sm mb-1">Active Integrations</p>
              <p className="text-2xl font-bold text-white">0 / 2</p>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4">
              <p className="text-zinc-400 text-sm mb-1">Active Projects</p>
              <p className="text-2xl font-bold text-white">Unlimited</p>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Upgrade Your Plan</h3>
            <div className="inline-flex items-center gap-4 bg-zinc-900 rounded-full p-1 border border-zinc-800">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  !isYearly
                    ? 'bg-neon-green text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isYearly
                    ? 'bg-neon-green text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-neon-green/20 text-neon-green px-2 py-0.5 rounded-full">
                  Save 15%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`bg-zinc-900/50 backdrop-blur-xl border-2 rounded-xl p-6 relative transition-all hover:scale-[1.02] ${
                  plan.popular
                    ? 'border-neon-green shadow-lg shadow-neon-green/20'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-neon-green to-emerald-400 text-black text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">
                      £{isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-zinc-400 text-sm">/month</span>
                  </div>
                  <p className="text-sm text-zinc-400">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.name)}
                  disabled={loading !== null || subscription?.plan_name === plan.name}
                  className={`w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-neon-green to-emerald-400 text-black hover:scale-[1.02]'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {loading === plan.name ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : subscription?.plan_name === plan.name ? (
                    'Current Plan'
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Method
          </h3>

          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-zinc-600" />
            </div>
            <p className="text-zinc-400 mb-4">No payment method added</p>
            <p className="text-sm text-zinc-500 mb-4">Add a payment method to upgrade your plan</p>
            <button className="px-6 py-3 bg-neon-green/10 border border-neon-green/30 text-neon-green rounded-xl hover:bg-neon-green/20 transition-all">
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
