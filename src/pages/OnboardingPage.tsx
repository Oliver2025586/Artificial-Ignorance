import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import { supabase } from '../lib/supabase';
import { Sparkles, Building2, Users, User, Check, ArrowRight } from 'lucide-react';

type UserType = 'business_owner' | 'agency' | 'individual';
type Goal = 'automation' | 'voice_handling' | 'crm_setup' | 'lead_generation' | 'customer_support';

const USER_TYPES = [
  { id: 'business_owner' as UserType, label: 'Business Owner', icon: Building2, description: 'Running my own business' },
  { id: 'agency' as UserType, label: 'Agency', icon: Users, description: 'Managing multiple clients' },
  { id: 'individual' as UserType, label: 'Individual', icon: User, description: 'Personal or freelance use' },
];

const GOALS = [
  { id: 'automation' as Goal, label: 'Automate Workflows', description: 'Save time with AI automation' },
  { id: 'voice_handling' as Goal, label: 'Voice Call Handling', description: 'AI-powered phone conversations' },
  { id: 'crm_setup' as Goal, label: 'CRM Integration', description: 'Connect with existing tools' },
  { id: 'lead_generation' as Goal, label: 'Lead Generation', description: 'Capture and qualify leads' },
  { id: 'customer_support' as Goal, label: 'Customer Support', description: '24/7 automated support' },
];

export default function OnboardingPage() {
  usePageTitle('Onboarding — Artificial Ignorance');
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 4;

  const toggleGoal = (goal: Goal) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleComplete = async () => {
    if (!user) return;

    setLoading(true);

    try {
      await supabase
        .from('user_profiles')
        .update({
          full_name: fullName,
          company_name: companyName,
          user_type: userType,
          preferences: { goals: selectedGoals },
          onboarding_completed: true,
          onboarding_step: 4,
        })
        .eq('id', user.id);

      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-emerald-400 rounded-lg flex items-center justify-center shadow-lg shadow-neon-green/30">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Let's personalize your experience</h2>
                  <p className="text-sm text-zinc-400">Step {step} of {totalSteps}</p>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="text-sm text-zinc-400 hover:text-neon-green transition-colors"
              >
                Skip for now
              </button>
            </div>

            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    i < step ? 'bg-gradient-to-r from-neon-green to-emerald-400' : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-3">
                  Welcome to Artificial Ignorance!
                </h1>
                <p className="text-zinc-400 text-lg">
                  Let's set up your workspace in just a few steps
                </p>
              </div>

              <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neon-green/10 border-2 border-neon-green flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Quick Setup</h3>
                    <p className="text-zinc-400 text-sm">
                      We'll ask you a few questions to customize your experience. This takes less than 2 minutes.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-gradient-to-r from-neon-green to-emerald-400 hover:from-emerald-400 hover:to-neon-green text-black font-bold rounded-xl transition-all shadow-lg shadow-neon-green/30 hover:shadow-neon-green/50 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-3">
                  What best describes you?
                </h1>
                <p className="text-zinc-400">
                  This helps us tailor the platform to your needs
                </p>
              </div>

              <div className="space-y-3">
                {USER_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = userType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setUserType(type.id)}
                      className={`w-full p-5 rounded-xl border-2 transition-all text-left group ${
                        isSelected
                          ? 'bg-neon-green/10 border-neon-green shadow-lg shadow-neon-green/20'
                          : 'bg-zinc-800/30 border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-neon-green text-black' : 'bg-zinc-700 text-zinc-300 group-hover:bg-zinc-600'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${isSelected ? 'text-neon-green' : 'text-white'}`}>
                            {type.label}
                          </h3>
                          <p className="text-sm text-zinc-400">{type.description}</p>
                        </div>
                        {isSelected && (
                          <Check className="w-6 h-6 text-neon-green" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!userType}
                className="w-full py-3 bg-gradient-to-r from-neon-green to-emerald-400 hover:from-emerald-400 hover:to-neon-green text-black font-bold rounded-xl transition-all shadow-lg shadow-neon-green/30 hover:shadow-neon-green/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-3">
                  What do you want to achieve?
                </h1>
                <p className="text-zinc-400">
                  Select all that apply
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {GOALS.map((goal) => {
                  const isSelected = selectedGoals.includes(goal.id);
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'bg-neon-green/10 border-neon-green shadow-lg shadow-neon-green/20'
                          : 'bg-zinc-800/30 border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`font-semibold mb-1 ${isSelected ? 'text-neon-green' : 'text-white'}`}>
                            {goal.label}
                          </h3>
                          <p className="text-sm text-zinc-400">{goal.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-neon-green border-neon-green' : 'border-zinc-600'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-black" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(4)}
                disabled={selectedGoals.length === 0}
                className="w-full py-3 bg-gradient-to-r from-neon-green to-emerald-400 hover:from-emerald-400 hover:to-neon-green text-black font-bold rounded-xl transition-all shadow-lg shadow-neon-green/30 hover:shadow-neon-green/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-3">
                  Tell us about yourself
                </h1>
                <p className="text-zinc-400">
                  Just a few details to complete your profile
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {(userType === 'business_owner' || userType === 'agency') && (
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-zinc-300 mb-2">
                      Company Name {userType === 'individual' && '(Optional)'}
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>
                )}
              </div>

              <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neon-green" />
                  You're all set!
                </h3>
                <p className="text-sm text-zinc-400">
                  Click below to access your personalized dashboard
                </p>
              </div>

              <button
                onClick={handleComplete}
                disabled={!fullName || loading}
                className="w-full py-3 bg-gradient-to-r from-neon-green to-emerald-400 hover:from-emerald-400 hover:to-neon-green text-black font-bold rounded-xl transition-all shadow-lg shadow-neon-green/30 hover:shadow-neon-green/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Setting up...
                  </>
                ) : (
                  <>
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
