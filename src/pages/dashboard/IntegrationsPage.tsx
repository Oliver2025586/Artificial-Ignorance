import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import {
  Zap,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Database,
  Check,
  Plus,
  ExternalLink,
  Trash2,
  Lock,
  Slack
} from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import UpgradeModal from '../../components/dashboard/UpgradeModal';

interface Integration {
  id: string;
  integration_type: string;
  integration_name: string;
  is_active: boolean;
  connected_at: string;
}

const MAX_FREE_INTEGRATIONS = 2;

const AVAILABLE_INTEGRATIONS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Connect WhatsApp Business API',
    icon: MessageSquare,
    color: 'green-500',
    category: 'Communication',
    free: true
  },
  {
    id: 'sms',
    name: 'SMS/Twilio',
    description: 'Send and receive text messages',
    icon: Phone,
    color: 'red-500',
    category: 'Communication',
    free: true
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Email automation and responses',
    icon: Mail,
    color: 'blue-500',
    category: 'Communication',
    free: false
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'CRM data sync',
    icon: Database,
    color: 'cyan-500',
    category: 'CRM',
    free: false
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Marketing and CRM',
    icon: Database,
    color: 'orange-500',
    category: 'CRM',
    free: false
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect 5000+ apps',
    icon: Zap,
    color: 'amber-500',
    category: 'Automation',
    free: false
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication',
    icon: Slack,
    color: 'purple-500',
    category: 'Communication',
    free: false
  },
  {
    id: 'webhook',
    name: 'Custom Webhook',
    description: 'Connect any service',
    icon: Globe,
    color: 'gray-500',
    category: 'Custom',
    free: false
  },
];

export default function IntegrationsPage() {
  const { user } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const categories = ['All', ...Array.from(new Set(AVAILABLE_INTEGRATIONS.map(i => i.category)))];

  useEffect(() => {
    if (user) {
      loadIntegrations();
    }
  }, [user]);

  const loadIntegrations = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_integrations')
        .select('*')
        .eq('user_id', user.id)
        .order('connected_at', { ascending: false });

      if (data) {
        setIntegrations(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading integrations:', error);
      setLoading(false);
    }
  };

  const handleConnect = async (integrationType: string, integrationName: string, isFree: boolean) => {
    if (!user) return;

    if (!isFree || integrations.length >= MAX_FREE_INTEGRATIONS) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('user_integrations')
        .insert({
          user_id: user.id,
          integration_type: integrationType,
          integration_name: integrationName,
          is_active: true,
          config: {},
        });

      if (!error) {
        loadIntegrations();
      }
    } catch (error) {
      console.error('Error connecting integration:', error);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    try {
      const { error } = await supabase
        .from('user_integrations')
        .delete()
        .eq('id', integrationId);

      if (!error) {
        loadIntegrations();
      }
    } catch (error) {
      console.error('Error disconnecting integration:', error);
    }
  };

  const isConnected = (integrationType: string) => {
    return integrations.some(i => i.integration_type === integrationType);
  };

  const filteredIntegrations = selectedCategory === 'All'
    ? AVAILABLE_INTEGRATIONS
    : AVAILABLE_INTEGRATIONS.filter(i => i.category === selectedCategory);

  const hasReachedFreeLimit = integrations.length >= MAX_FREE_INTEGRATIONS;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Integrations</h2>
            <p className="text-zinc-400">
              Connect your favorite tools and services ({integrations.length} / {MAX_FREE_INTEGRATIONS} free integrations used)
            </p>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-semibold rounded-xl hover:scale-[1.02] transition-all"
          >
            Unlock All
          </button>
        </div>

        {hasReachedFreeLimit && (
          <div className="bg-gradient-to-r from-neon-green/10 to-emerald-400/10 border border-neon-green/30 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Free Integration Limit Reached
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  You've connected {MAX_FREE_INTEGRATIONS} free integrations. Upgrade to connect unlimited integrations and unlock premium features.
                </p>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-semibold rounded-lg hover:scale-[1.02] transition-all"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}

        {integrations.length > 0 && (
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Connected Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration) => {
                const integrationInfo = AVAILABLE_INTEGRATIONS.find(
                  i => i.id === integration.integration_type
                );
                if (!integrationInfo) return null;

                const Icon = integrationInfo.icon;
                return (
                  <div
                    key={integration.id}
                    className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-${integrationInfo.color}/10 border border-${integrationInfo.color}/30 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${integrationInfo.color}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-green"></div>
                        <span className="text-xs text-zinc-400">Active</span>
                      </div>
                    </div>
                    <h4 className="text-white font-semibold mb-1">{integration.integration_name}</h4>
                    <p className="text-sm text-zinc-400 mb-4">{integrationInfo.description}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-lg transition-all flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Configure
                      </button>
                      <button
                        onClick={() => handleDisconnect(integration.id)}
                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <h3 className="text-lg font-bold text-white">Available Integrations</h3>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-neon-green/10 text-neon-green border border-neon-green/30'
                      : 'bg-zinc-800/30 text-zinc-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map((integration) => {
              const Icon = integration.icon;
              const connected = isConnected(integration.id);
              const canConnect = integration.free && !hasReachedFreeLimit;
              const requiresUpgrade = !integration.free || hasReachedFreeLimit;

              return (
                <div
                  key={integration.id}
                  className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all group relative"
                >
                  {requiresUpgrade && !connected && (
                    <div className="absolute top-3 right-3">
                      <Lock className="w-4 h-4 text-zinc-500" />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-${integration.color}/10 border border-${integration.color}/30 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${integration.color}`} />
                    </div>
                    {connected && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-neon-green/10 border border-neon-green/30 rounded-full">
                        <Check className="w-3 h-3 text-neon-green" />
                        <span className="text-xs text-neon-green font-medium">Connected</span>
                      </div>
                    )}
                  </div>
                  <h4 className="text-white font-semibold mb-1">{integration.name}</h4>
                  <p className="text-sm text-zinc-400 mb-4">{integration.description}</p>
                  <button
                    onClick={() => !connected && handleConnect(integration.id, integration.name, integration.free)}
                    disabled={connected}
                    className={`w-full py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      connected
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : requiresUpgrade
                        ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20'
                        : 'bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20'
                    }`}
                  >
                    {connected ? (
                      <>
                        <Check className="w-4 h-4" />
                        Connected
                      </>
                    ) : requiresUpgrade ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Upgrade to Connect
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Connect
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="Unlimited Integrations"
      />
    </DashboardLayout>
  );
}
