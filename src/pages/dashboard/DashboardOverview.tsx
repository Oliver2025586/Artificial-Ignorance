import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePageTitle } from '../../utils/usePageTitle';
import { supabase } from '../../lib/supabase';
import {
  TrendingUp,
  Users,
  Phone,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Activity
} from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import VoicePlayground from '../../components/dashboard/VoicePlayground';
import UpgradeModal from '../../components/dashboard/UpgradeModal';

interface UserProfile {
  full_name: string;
  company_name: string;
  onboarding_completed: boolean;
  preferences: any;
}

interface Stats {
  totalIntegrations: number;
  totalProjects: number;
  activeProjects: number;
  aiCallsUsed: number;
}

const FREE_AI_CALLS_LIMIT = 20;

export default function DashboardOverview() {
  usePageTitle('Dashboard — Artificial Ignorance');
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<Stats>({ totalIntegrations: 0, totalProjects: 0, activeProjects: 0, aiCallsUsed: 0 });
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      const { data: integrations } = await supabase
        .from('user_integrations')
        .select('*')
        .eq('user_id', user.id);

      const { data: projects } = await supabase
        .from('user_projects')
        .select('*')
        .eq('user_id', user.id);

      const aiCallsUsed = profileData?.preferences?.voice_usage || 0;

      setStats({
        totalIntegrations: integrations?.length || 0,
        totalProjects: projects?.length || 0,
        activeProjects: projects?.filter(p => p.status === 'active').length || 0,
        aiCallsUsed
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const STAT_CARDS = [
    {
      label: 'AI Calls Used',
      value: `${stats.aiCallsUsed} / ${FREE_AI_CALLS_LIMIT}`,
      change: `${Math.max(0, FREE_AI_CALLS_LIMIT - stats.aiCallsUsed)} remaining`,
      icon: Phone,
      color: stats.aiCallsUsed >= FREE_AI_CALLS_LIMIT ? 'red-500' : 'neon-green'
    },
    { label: 'Active Integrations', value: `${stats.totalIntegrations} / 2`, change: '', icon: Zap, color: 'blue-500' },
    { label: 'Active Projects', value: stats.activeProjects.toString(), change: '', icon: Activity, color: 'purple-500' },
    { label: 'Success Rate', value: '0%', change: 'No data yet', icon: TrendingUp, color: 'emerald-500' },
  ];

  const CHECKLIST_ITEMS = [
    { id: 1, label: 'Complete your profile', completed: !!profile?.full_name, link: '/dashboard/settings' },
    { id: 2, label: 'Connect your first integration', completed: stats.totalIntegrations > 0, link: '/dashboard/integrations' },
    { id: 3, label: 'Create your first project', completed: stats.totalProjects > 0, link: '/dashboard/projects' },
    { id: 4, label: 'Test voice playground', completed: stats.aiCallsUsed > 0, link: '#voice-playground' },
  ];

  const completedCount = CHECKLIST_ITEMS.filter(item => item.completed).length;
  const progressPercentage = (completedCount / CHECKLIST_ITEMS.length) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Welcome back, {profile?.full_name || user?.email?.split('@')[0]}!
          </h2>
          <p className="text-zinc-400">
            Here's what's happening with your AI agents today
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAT_CARDS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${stat.color}/10 border border-${stat.color}/30 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-zinc-400">{stat.label}</p>
                {stat.change && (
                  <p className="text-xs text-zinc-500 mt-2">{stat.change}</p>
                )}
              </div>
            );
          })}
        </div>

        {completedCount < CHECKLIST_ITEMS.length && (
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Getting Started</h3>
                <p className="text-sm text-zinc-400">
                  {completedCount} of {CHECKLIST_ITEMS.length} tasks completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-neon-green">{Math.round(progressPercentage)}%</div>
                <p className="text-xs text-zinc-500">Complete</p>
              </div>
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-green to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="space-y-3">
              {CHECKLIST_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="flex items-center justify-between p-4 bg-zinc-800/30 hover:bg-zinc-800/50 border border-zinc-700 rounded-lg transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      item.completed
                        ? 'bg-neon-green border-neon-green'
                        : 'border-zinc-600 group-hover:border-zinc-500'
                    }`}>
                      {item.completed && <CheckCircle2 className="w-4 h-4 text-black" />}
                    </div>
                    <span className={`font-medium ${item.completed ? 'text-zinc-500 line-through' : 'text-white'}`}>
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-neon-green transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div id="voice-playground">
          <VoicePlayground onUpgradeClick={() => setShowUpgradeModal(true)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Activity</h3>
              <Clock className="w-5 h-5 text-zinc-500" />
            </div>

            {stats.totalProjects === 0 && stats.aiCallsUsed === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-zinc-600" />
                </div>
                <p className="text-zinc-400 mb-4">No activity yet</p>
                <Link
                  to="/dashboard/projects"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green rounded-lg hover:bg-neon-green/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Project
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.aiCallsUsed > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-neon-green mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Used voice playground {stats.aiCallsUsed} time{stats.aiCallsUsed > 1 ? 's' : ''}</p>
                      <p className="text-zinc-500 text-xs mt-1">Today</p>
                    </div>
                  </div>
                )}
                {stats.totalProjects > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Created {stats.totalProjects} project{stats.totalProjects > 1 ? 's' : ''}</p>
                      <p className="text-zinc-500 text-xs mt-1">Recently</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/dashboard/projects"
                className="p-4 bg-gradient-to-br from-neon-green/10 to-emerald-400/10 border border-neon-green/30 rounded-xl hover:scale-[1.02] transition-all group"
              >
                <Plus className="w-6 h-6 text-neon-green mb-2" />
                <p className="text-white font-medium text-sm">New Project</p>
              </Link>

              <Link
                to="/dashboard/integrations"
                className="p-4 bg-zinc-800/30 border border-zinc-700 rounded-xl hover:border-zinc-600 hover:scale-[1.02] transition-all group"
              >
                <Zap className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-white font-medium text-sm">Add Integration</p>
              </Link>

              <Link
                to="/dashboard/settings"
                className="p-4 bg-zinc-800/30 border border-zinc-700 rounded-xl hover:border-zinc-600 hover:scale-[1.02] transition-all group"
              >
                <Users className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-white font-medium text-sm">Settings</p>
              </Link>

              <button
                onClick={() => setShowUpgradeModal(true)}
                className="p-4 bg-zinc-800/30 border border-zinc-700 rounded-xl hover:border-zinc-600 hover:scale-[1.02] transition-all group text-left"
              >
                <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
                <p className="text-white font-medium text-sm">Upgrade Plan</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </DashboardLayout>
  );
}
