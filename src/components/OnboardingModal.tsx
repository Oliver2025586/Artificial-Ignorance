import { useState, FormEvent } from 'react';
import { X, Building2, Users, Target } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const industries = [
  'Real Estate',
  'E-Commerce',
  'Healthcare',
  'Customer Support',
  'Financial Services',
  'Education',
  'Hospitality',
  'Other'
];

const teamSizes = [
  '1-10',
  '11-50',
  '51-200',
  '201-1000',
  '1000+'
];

const useCases = [
  'Lead Qualification',
  'Customer Support',
  'Appointment Scheduling',
  'Order Management',
  'Sales Outreach',
  'Survey & Feedback',
  'Other'
];

export default function OnboardingModal({ isOpen, onClose, userId }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    teamSize: '',
    useCase: '',
    goals: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('user_onboarding')
        .insert([
          {
            user_id: userId,
            company_name: formData.companyName,
            industry: formData.industry,
            team_size: formData.teamSize,
            use_case: formData.useCase,
            goals: formData.goals,
            completed_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      onClose();
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.companyName && formData.industry;
    if (step === 2) return formData.teamSize && formData.useCase;
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-zinc-900 border-2 border-neon-green rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all ${
                      s === step
                        ? 'w-8 bg-neon-green'
                        : s < step
                        ? 'w-2 bg-neon-green/50'
                        : 'w-2 bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white text-center mb-2">
              {step === 1 && 'Welcome to VoiceAI'}
              {step === 2 && 'Tell Us About Your Needs'}
              {step === 3 && 'What Are Your Goals?'}
            </h2>
            <p className="text-zinc-400 text-center">
              {step === 1 && 'Let\'s get to know your business'}
              {step === 2 && 'Help us customize your experience'}
              {step === 3 && 'Share what you want to achieve'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                    <Building2 className="w-4 h-4 text-neon-green" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green transition-all"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                    <Target className="w-4 h-4 text-neon-green" />
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-neon-green transition-all"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                    <Users className="w-4 h-4 text-neon-green" />
                    Team Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {teamSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFormData({ ...formData, teamSize: size })}
                        className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          formData.teamSize === size
                            ? 'bg-neon-green text-black border-neon-green'
                            : 'bg-black text-zinc-300 border-zinc-800 hover:border-neon-green'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                    <Target className="w-4 h-4 text-neon-green" />
                    Primary Use Case
                  </label>
                  <select
                    value={formData.useCase}
                    onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-neon-green transition-all"
                  >
                    <option value="">Select your primary use case</option>
                    {useCases.map((useCase) => (
                      <option key={useCase} value={useCase}>
                        {useCase}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-2 block">
                    What do you want to achieve with VoiceAI?
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green transition-all resize-none"
                    placeholder="Tell us about your goals, challenges, or specific use cases..."
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all font-medium"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex-1 px-6 py-3 bg-neon-green text-black rounded-lg hover:bg-[#00dd00] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-neon-green text-black rounded-lg hover:bg-[#00dd00] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Completing...' : 'Complete Setup'}
                </button>
              )}
            </div>

            {step === 1 && (
              <button
                type="button"
                onClick={onClose}
                className="w-full mt-4 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Skip for now
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
