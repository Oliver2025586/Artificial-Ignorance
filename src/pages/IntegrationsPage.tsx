import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Zap, CheckCircle, Network, Phone, Database, Mail, MessageSquare, Calendar, Users, ShoppingCart, Briefcase, Cloud, Bot, Wifi, Plug, Clock, MousePointerClick, Search } from 'lucide-react';
import { usePageTitle } from '../utils/usePageTitle';
import AnimatedBackground from '../components/AnimatedBackground';
import NetworkAnimation from '../components/NetworkAnimation';
import Footer from '../components/Footer';
import { integrationLogos } from '../data/integrationLogos';

const integrationCategories = {
  calendars: {
    name: 'Calendars',
    icon: Calendar,
    integrations: ['Google Calendar', 'Outlook', 'Apple Calendar', 'Cal.com', 'Zoho Calendar', 'Cron', 'Notion Calendar', 'Fantastical', 'Teamup', 'Motion']
  },
  ccaas: {
    name: 'CCaaS',
    icon: Phone,
    integrations: ['Twilio Flex', 'Aircall', 'Dialpad', 'Genesys', 'Five9', 'RingCentral', 'Talkdesk', 'Vonage', 'CloudTalk', 'Nextiva']
  },
  crm: {
    name: 'CRM',
    icon: Users,
    integrations: ['HubSpot', 'Salesforce', 'Pipedrive', 'Zoho CRM', 'Close', 'Monday CRM', 'Capsule', 'Nimble', 'Insightly', 'Copper']
  },
  verticalCrm: {
    name: 'Vertical CRM',
    icon: Briefcase,
    integrations: ['GoHighLevel', 'Clio', 'JobNimbus', 'ServiceTitan', 'Zenoti', 'Realvolve', 'SimplePractice', 'Senta', 'Thryv', 'Healthie']
  },
  sales: {
    name: 'Sales',
    icon: MousePointerClick,
    integrations: ['Outreach', 'Apollo', 'Lemlist', 'Salesloft', 'Instantly', 'Reply.io', 'Groove', 'Amplemarket', 'Yesware', 'Klenty']
  },
  telephony: {
    name: 'Telephony',
    icon: Wifi,
    integrations: ['Twilio', 'Plivo', 'Vonage', 'Telnyx', '8x8', 'Zoom Phone', 'Nexmo', 'Grasshopper', 'CallRail', 'CloudTalk']
  },
  connectors: {
    name: 'Connectors',
    icon: Plug,
    integrations: ['Zapier', 'Make', 'Pabbly Connect', 'n8n', 'Tray.io', 'Workato', 'Syncari', 'Automate.io', 'Relay', 'Albato']
  },
  developer: {
    name: 'Developer Tools',
    icon: Code,
    integrations: ['Postman', 'GitHub', 'RapidAPI', 'Swagger', 'Replit', 'Glitch', 'CodeSandbox', 'Insomnia', 'Supabase', 'Firebase']
  },
  support: {
    name: 'Customer Support',
    icon: MessageSquare,
    integrations: ['Zendesk', 'Intercom', 'Freshdesk', 'Gorgias', 'HelpScout', 'Front', 'Tidio', 'Crisp', 'Drift', 'LiveAgent']
  },
  ai: {
    name: 'AI',
    icon: Bot,
    integrations: ['OpenAI', 'ElevenLabs', 'Deepgram', 'Whisper', 'Hugging Face', 'Anthropic', 'Cohere', 'Stability AI', 'Replicate', 'Google Vertex']
  },
  commerce: {
    name: 'Commerce & Payments',
    icon: ShoppingCart,
    integrations: ['Stripe', 'PayPal', 'Shopify', 'WooCommerce', 'Square', 'Kajabi', 'ThriveCart', 'Gumroad', 'Selar', 'Paddle']
  },
  productivity: {
    name: 'Productivity',
    icon: Clock,
    integrations: ['Notion', 'ClickUp', 'Asana', 'Trello', 'Slack', 'Google Workspace', 'Microsoft Teams', 'Coda', 'Airtable', 'Todoist']
  }
};

const featuredIntegrations = [
  {
    name: 'Zapier',
    icon: Zap,
    logo: 'https://cdn.zappy.app/83e340a4afda92e2d989be598da158fa.png',
    description: 'Connect to 5,000+ apps without writing a single line of code. Automate workflows and sync data bi-directionally in real-time.',
    benefits: ['No-code automation', 'Instant triggers', 'Multi-step workflows']
  },
  {
    name: 'HubSpot',
    icon: Users,
    logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
    description: 'Seamlessly integrate with your CRM to auto-log calls, update contact records, and qualify leads using AI-powered insights.',
    benefits: ['Auto-sync contacts', 'Call activity logging', 'Lead scoring']
  },
  {
    name: 'Slack',
    icon: MessageSquare,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
    description: 'Get real-time notifications, call transcripts, and conversation summaries delivered directly to your team channels.',
    benefits: ['Instant notifications', 'Team collaboration', 'Custom alerts']
  },
  {
    name: 'OpenAI',
    icon: Bot,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    description: 'Leverage GPT-4o for natural conversations, intelligent responses, and context-aware interactions with your customers.',
    benefits: ['Advanced AI models', 'Natural dialogue', 'Context retention']
  }
];

const apiTools = [
  {
    name: 'Voice API',
    icon: Phone,
    description: 'Real-time voice synthesis with natural-sounding AI voices',
    features: ['Low latency', 'Global coverage', 'WebRTC support', 'Multiple voices']
  },
  {
    name: 'Transcription API',
    icon: MessageSquare,
    description: 'Speech-to-text powered by Deepgram and Whisper',
    features: ['99% accuracy', 'Real-time', 'Multi-language', 'Custom vocab']
  },
  {
    name: 'LLM API',
    icon: Bot,
    description: 'Finetuned GPT-4o conversational AI',
    features: ['Context aware', 'Custom prompts', 'Function calling', 'Streaming']
  }
];

const integrationDescriptions: Record<string, string> = {
  'Google Calendar': 'Schedule and manage appointments',
  'Outlook': 'Microsoft calendar integration',
  'Apple Calendar': 'Native iOS calendar sync',
  'Cal.com': 'Open-source scheduling',
  'Twilio Flex': 'Cloud contact center platform',
  'Aircall': 'Cloud-based phone system',
  'HubSpot': 'All-in-one CRM platform',
  'Salesforce': 'World\'s #1 CRM',
  'Zapier': 'Connect 5,000+ apps',
  'Make': 'Visual automation platform',
  'OpenAI': 'GPT-4o AI models',
  'ElevenLabs': 'Realistic voice AI',
  'Stripe': 'Payment processing',
  'Shopify': 'E-commerce platform',
  'Zendesk': 'Customer service platform',
  'Slack': 'Team communication',
  'Notion': 'All-in-one workspace',
  'ClickUp': 'Project management'
};

export default function IntegrationsPage() {
  usePageTitle('Integrations — Artificial Ignorance');
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('calendars');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToIntegrations = () => {
    document.getElementById('integrations')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategory = (categoryKey: string) => {
    setActiveCategory(categoryKey);
    categoryRefs.current[categoryKey]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getFilteredCategories = () => {
    if (!searchQuery.trim()) return integrationCategories;

    const filtered: typeof integrationCategories = {} as any;
    Object.entries(integrationCategories).forEach(([key, category]) => {
      const matchingIntegrations = category.integrations.filter(integration =>
        integration.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingIntegrations.length > 0) {
        filtered[key as keyof typeof integrationCategories] = {
          ...category,
          integrations: matchingIntegrations
        };
      }
    });
    return filtered;
  };

  const filteredCategories = getFilteredCategories();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const [key] of Object.entries(integrationCategories)) {
        const element = categoryRefs.current[key];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(key);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatedBackground />

      <div className="relative z-10">
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-24">
          <NetworkAnimation />

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neon-green/10 border-2 border-neon-green/30 mb-6 animate-pulse">
                <Network className="w-12 h-12 text-neon-green" />
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Seamlessly Integrate with Your{' '}
              <span className="text-neon-green relative">
                Entire Stack
                <span className="absolute bottom-0 left-0 w-full h-1 bg-neon-green/30 blur-sm"></span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Connect Artificial Ignorance to the tools you already use — no code required.
            </p>

            <button
              onClick={scrollToIntegrations}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-neon-green text-black font-bold text-lg rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
            >
              <span>Explore Integrations</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 rounded-lg bg-neon-green blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10"></span>
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-neon-green/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-neon-green rounded-full animate-pulse"></div>
            </div>
          </div>
        </section>

        <section id="integrations" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Connect to <span className="text-neon-green">Everything</span> You Already Use
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                From CRMs to AI tools, our ecosystem plugs into your entire workflow.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-80 flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-2xl p-6">
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search integrations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black border-2 border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-neon-green focus:outline-none transition-colors"
                      />
                    </div>

                    <nav className="space-y-2">
                      {Object.entries(integrationCategories).map(([key, category]) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === key;
                        return (
                          <button
                            key={key}
                            onClick={() => scrollToCategory(key)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left relative ${
                              isActive
                                ? 'bg-neon-green/10 text-neon-green border-l-4 border-neon-green'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-neon-green'
                            }`}
                          >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">{category.name}</span>
                            <span className="ml-auto text-xs text-gray-500">{category.integrations.length}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </aside>

              <div className="flex-1 space-y-12">
                {Object.keys(filteredCategories).length === 0 ? (
                  <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-6">
                      <Search className="w-10 h-10 text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No integrations found</h3>
                    <p className="text-gray-400">Try adjusting your search query</p>
                  </div>
                ) : (
                  Object.entries(filteredCategories).map(([key, category]) => {
                    const Icon = category.icon;
                    return (
                      <div
                        key={key}
                        ref={(el) => (categoryRefs.current[key] = el)}
                        className="scroll-mt-24"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-lg bg-neon-green/10 border-2 border-neon-green/30 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-neon-green" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                          <span className="ml-auto text-sm text-gray-500">{category.integrations.length} integrations</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.integrations.map((integration) => {
                            const description = integrationDescriptions[integration] || 'Seamless integration';
                            const logoUrl = integrationLogos[integration];
                            return (
                              <div
                                key={integration}
                                onClick={() => navigate('/talk-to-sales')}
                                className="group bg-gray-900/30 backdrop-blur-sm border-2 border-gray-800 rounded-xl p-6 hover:border-neon-green hover:bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neon-green/20 cursor-pointer"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-lg bg-white border-2 border-gray-700 group-hover:border-neon-green flex items-center justify-center flex-shrink-0 transition-all p-2">
                                    {logoUrl ? (
                                      <img
                                        src={logoUrl}
                                        alt={`${integration} logo`}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          e.currentTarget.parentElement!.innerHTML = '<div class="w-6 h-6 bg-neon-green/20 rounded group-hover:bg-neon-green/40 transition-colors"></div>';
                                        }}
                                      />
                                    ) : (
                                      <div className="w-6 h-6 bg-neon-green/20 rounded group-hover:bg-neon-green/40 transition-colors"></div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-white group-hover:text-neon-green transition-colors mb-1">
                                      {integration}
                                    </h4>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                      {description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Integration <span className="text-neon-green">Highlights</span>
              </h2>
              <p className="text-xl text-gray-400">
                Deep integrations that power your workflow
              </p>
            </div>

            <div className="space-y-12">
              {featuredIntegrations.map((integration, index) => {
                const Icon = integration.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={integration.name}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center group`}
                  >
                    <div className="flex-1 bg-black border-2 border-gray-800 rounded-2xl p-8 hover:border-neon-green transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 hover:-translate-y-1">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-neon-green/10 border-2 border-neon-green/30 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-green/20 group-hover:border-neon-green transition-all">
                          <Icon className="w-8 h-8 text-neon-green" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold mb-2 group-hover:text-neon-green transition-colors">
                            {integration.name}
                          </h3>
                          <p className="text-gray-400 text-lg">
                            {integration.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {integration.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center gap-2 bg-gray-900/50 rounded-lg p-3">
                            <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0" />
                            <span className="text-sm text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <button className="inline-flex items-center gap-2 text-neon-green hover:text-white transition-colors group/btn">
                        <span className="font-semibold">Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    <div className="w-full lg:w-64 h-64 bg-white rounded-2xl border-2 border-neon-green/30 flex items-center justify-center group-hover:border-neon-green transition-all p-8">
                      <img
                        src={integration.logo}
                        alt={`${integration.name} logo`}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        onError={(e) => {
                          const Icon = integration.icon;
                          e.currentTarget.parentElement!.innerHTML = `<div class="w-32 h-32 text-neon-green/40"></div>`;
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built for <span className="text-neon-green">Developers</span>
              </h2>
              <p className="text-xl text-gray-400">
                Access our APIs for Voice, Transcription, and AI Conversations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {apiTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="group bg-black border-2 border-gray-800 rounded-2xl p-8 hover:border-neon-green transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/20 hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 rounded-xl bg-neon-green/10 border-2 border-neon-green/30 group-hover:bg-neon-green group-hover:border-neon-green flex items-center justify-center mb-6 transition-all">
                      <Icon className="w-8 h-8 text-neon-green group-hover:text-black transition-colors" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-green transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {tool.description}
                    </p>

                    <div className="space-y-2">
                      {tool.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                to="#docs"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 border-2 border-neon-green text-neon-green rounded-lg hover:bg-neon-green hover:text-black transition-all duration-300 font-semibold transform hover:scale-105"
              >
                <Code className="w-5 h-5" />
                View API Documentation
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gray-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How It <span className="text-neon-green">Works</span>
              </h2>
              <p className="text-xl text-gray-400">
                Seamless connectivity in three simple steps
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-neon-green/0 via-neon-green to-neon-green/0 -translate-y-1/2">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-green/0 via-neon-green to-neon-green/0 blur-sm"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div className="relative bg-black border-2 border-gray-800 rounded-2xl p-8 hover:border-neon-green transition-all duration-300 group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-neon-green text-black font-bold text-2xl flex items-center justify-center border-4 border-black shadow-lg shadow-neon-green/50">
                    1
                  </div>
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-green/10 border-2 border-neon-green/30 mb-6 group-hover:bg-neon-green/20 group-hover:border-neon-green transition-all">
                      <Database className="w-10 h-10 text-neon-green" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-green transition-colors">
                      Your Tools
                    </h3>
                    <p className="text-gray-400">
                      Connect your existing CRM, calendar, and communication platforms
                    </p>
                  </div>
                </div>

                <div className="relative bg-black border-2 border-gray-800 rounded-2xl p-8 hover:border-neon-green transition-all duration-300 group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-neon-green text-black font-bold text-2xl flex items-center justify-center border-4 border-black shadow-lg shadow-neon-green/50">
                    2
                  </div>
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-green/10 border-2 border-neon-green/30 mb-6 group-hover:bg-neon-green/20 group-hover:border-neon-green transition-all">
                      <Network className="w-10 h-10 text-neon-green" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-green transition-colors">
                      AI Core
                    </h3>
                    <p className="text-gray-400">
                      Our intelligent system processes and routes conversations automatically
                    </p>
                  </div>
                </div>

                <div className="relative bg-black border-2 border-gray-800 rounded-2xl p-8 hover:border-neon-green transition-all duration-300 group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-neon-green text-black font-bold text-2xl flex items-center justify-center border-4 border-black shadow-lg shadow-neon-green/50">
                    3
                  </div>
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-green/10 border-2 border-neon-green/30 mb-6 group-hover:bg-neon-green/20 group-hover:border-neon-green transition-all">
                      <Zap className="w-10 h-10 text-neon-green" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-green transition-colors">
                      Automate
                    </h3>
                    <p className="text-gray-400">
                      Sit back while AI handles calls, updates records, and drives results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-neon-green rounded-3xl p-12 text-center overflow-hidden group">
              <div className="absolute inset-0 bg-neon-green/5 animate-pulse"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-green/20 border-2 border-neon-green mb-6 group-hover:scale-110 transition-transform">
                  <Cloud className="w-10 h-10 text-neon-green" />
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Don't See Your Tool Listed?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  We'll build a custom integration for your specific needs. No tool is too niche.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/signup"
                    className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-neon-green text-black font-bold rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Request Custom Integration</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    <span className="absolute inset-0 rounded-lg bg-neon-green blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity -z-10"></span>
                  </Link>

                  <Link
                    to="#demo"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-neon-green text-neon-green rounded-lg hover:bg-neon-green hover:text-black transition-all duration-300 font-semibold"
                  >
                    Book a Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}