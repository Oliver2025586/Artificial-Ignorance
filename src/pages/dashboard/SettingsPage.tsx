import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { User, Building2, Mail, Phone, Chrome, Shield, Trash2, Save } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

interface UserProfile {
  full_name: string;
  company_name: string;
  phone: string;
  user_type: string;
}

export default function SettingsPage() {
  const { user, resetPassword } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    full_name: '',
    company_name: '',
    phone: '',
    user_type: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordResetEmail, setPasswordResetEmail] = useState('');

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          company_name: data.company_name || '',
          phone: data.phone || '',
          user_type: data.user_type || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(profile)
        .eq('id', user.id);

      if (error) throw error;

      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const { error } = await resetPassword(user.email);
      if (!error) {
        setMessage('Password reset email sent! Check your inbox.');
      } else {
        setMessage('Error sending password reset email');
      }
    } catch (error) {
      setMessage('Error sending password reset email');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Account Settings</h2>
          <p className="text-zinc-400">Manage your account details and preferences</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl border ${
            message.includes('success') || message.includes('sent')
              ? 'bg-neon-green/10 border-neon-green/30 text-neon-green'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={profile.company_name}
                onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                User Type
              </label>
              <select
                value={profile.user_type}
                onChange={(e) => setProfile({ ...profile, user_type: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
              >
                <option value="">Select type</option>
                <option value="business_owner">Business Owner</option>
                <option value="agency">Agency</option>
                <option value="individual">Individual</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-semibold rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email & Authentication
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-zinc-400 cursor-not-allowed"
                />
                <div className="px-3 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm rounded-lg">
                  Verified
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Linked Accounts
              </label>
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Chrome className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Google</p>
                    <p className="text-xs text-zinc-500">OAuth provider</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-lg transition-all">
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <p className="text-sm text-zinc-400 mb-3">
                We'll send you a password reset link to your email
              </p>
              <button
                onClick={handlePasswordReset}
                disabled={loading}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all disabled:opacity-50"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h3>
          <p className="text-sm text-zinc-400 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
