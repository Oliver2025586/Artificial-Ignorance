import { useState } from 'react';
import { FileText, Globe, Plus, X, Info, Phone, PhoneCall, Settings, Zap, MessageSquare, GitBranch } from 'lucide-react';

type Tab = 'use-case' | 'flow-designer' | 'knowledge-base' | 'actions' | 'test-calls';

const mockContent = {
  'use-case': {
    title: 'Use Case Configuration',
    subtitle: 'Define how your AI agent will interact with customers'
  },
  'flow-designer': {
    title: 'Flow Designer',
    subtitle: 'Build conversation flows with visual drag-and-drop interface'
  },
  'knowledge-base': {
    title: 'Knowledge Base',
    subtitle: 'This AI Voice Agent can answer questions using trusted internal documents or URLs.',
    content: `Role: Paul qualifies buyer leads and books them with agents.
Area Served: [Insert region/metro area]
Booking Tool: Integrated scheduling calendar
Buyer Focus: Condos, single-family, townhomes
Timeline Focus: Buyers moving within 6 months
Pre-Approval: Preferred but not required
Sources of Leads: Website forms, paid ads, partnerships
Communication Style: Natural, not pushy, always moving the conversation forward`
  },
  'actions': {
    title: 'Custom Actions',
    subtitle: 'Connect external APIs and automate workflows'
  },
  'test-calls': {
    title: 'Test Calls',
    subtitle: 'Test your AI agent before going live'
  }
};

export default function AIAgentDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('use-case');
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showWebTooltip, setShowWebTooltip] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const [showFlowTemplates, setShowFlowTemplates] = useState(false);
  const [content, setContent] = useState(mockContent['knowledge-base'].content);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'use-case', label: 'Use Case' },
    { id: 'flow-designer', label: 'Flow Designer' },
    { id: 'knowledge-base', label: 'Knowledge Base' },
    { id: 'actions', label: 'Actions' },
    { id: 'test-calls', label: 'Test Calls' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'use-case':
        return (
          <div className="md:col-span-5 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {mockContent['use-case'].title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {mockContent['use-case'].subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Paul - Real Estate Qualifier"
                      className="w-full px-4 py-3 bg-black/80 border border-neon-green/30 rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Primary Goal
                    </label>
                    <select className="w-full px-4 py-3 bg-black/80 border border-neon-green/30 rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all">
                      <option>Lead Qualification</option>
                      <option>Appointment Booking</option>
                      <option>Customer Support</option>
                      <option>Sales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Industry
                    </label>
                    <select className="w-full px-4 py-3 bg-black/80 border border-neon-green/30 rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all">
                      <option>Real Estate</option>
                      <option>Healthcare</option>
                      <option>SaaS</option>
                      <option>E-commerce</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">Agent Personality</h4>

                <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-neon-green" />
                    <span className="text-white">Professional & Friendly</span>
                  </label>
                </div>

                <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-neon-green" />
                    <span className="text-white">Casual & Conversational</span>
                  </label>
                </div>

                <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-neon-green" />
                    <span className="text-white">Empathetic & Patient</span>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setActiveTab('flow-designer')}
                    className="w-full px-6 py-3 bg-neon-green text-black rounded-xl font-bold hover:bg-neon-green/90 hover:shadow-lg hover:shadow-neon-green/50 transition-all"
                  >
                    Save & Continue to Flow Designer
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'flow-designer':
        return (
          <div className="md:col-span-5 animate-fadeIn">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {mockContent['flow-designer'].title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {mockContent['flow-designer'].subtitle}
                </p>
              </div>

              <div className="bg-black/60 border-2 border-neon-green/20 rounded-xl p-8 min-h-[400px]">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-neon-green/20 border-2 border-neon-green rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-neon-green" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-2">Call Start</h4>
                      <p className="text-sm text-gray-400">Agent greets the caller</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-neon-green/30 pl-6 py-2">
                    <GitBranch className="w-5 h-5 text-neon-green/50 mb-2" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-neon-green/20 border-2 border-neon-green rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-neon-green" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-2">Qualification Questions</h4>
                      <p className="text-sm text-gray-400">Ask about needs and timeline</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-neon-green/30 pl-6 py-2">
                    <GitBranch className="w-5 h-5 text-neon-green/50 mb-2" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-neon-green/20 border-2 border-neon-green rounded-lg flex items-center justify-center">
                      <PhoneCall className="w-6 h-6 text-neon-green" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-2">Book Appointment</h4>
                      <p className="text-sm text-gray-400">Schedule meeting with agent</p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setShowFlowTemplates(true)}
                      className="px-6 py-3 bg-neon-green/10 border-2 border-neon-green/30 rounded-xl text-neon-green font-medium hover:bg-neon-green/20 hover:border-neon-green/50 transition-all"
                    >
                      <Plus className="w-5 h-5 inline mr-2" />
                      Choose Flow Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'knowledge-base':
        return (
          <>
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {mockContent['knowledge-base'].title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {mockContent['knowledge-base'].subtitle}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowPDFModal(true)}
                  className="w-full flex items-center gap-3 px-5 py-4 bg-neon-green/10 border-2 border-neon-green/30 rounded-xl text-neon-green font-medium hover:bg-neon-green/20 hover:border-neon-green/50 hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 group"
                >
                  <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Attached PDF</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowWebTooltip(!showWebTooltip)}
                    className="w-full flex items-center gap-3 px-5 py-4 bg-neon-green/10 border-2 border-neon-green/30 rounded-xl text-neon-green font-medium hover:bg-neon-green/20 hover:border-neon-green/50 hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 group"
                  >
                    <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Web Content Import</span>
                    <Info className="w-4 h-4 ml-auto" />
                  </button>

                  {showWebTooltip && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-black border-2 border-neon-green/30 rounded-xl shadow-xl shadow-neon-green/20 z-20 animate-fadeIn">
                      <p className="text-sm text-gray-300">
                        Import content from any URL to train your AI agent. Supports articles, documentation, and web pages.
                      </p>
                      <button
                        onClick={() => setShowWebTooltip(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-neon-green"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowAddContent(!showAddContent)}
                  className="w-full flex items-center gap-3 px-5 py-4 bg-neon-green text-black rounded-xl font-bold hover:bg-neon-green/90 hover:shadow-lg hover:shadow-neon-green/50 transition-all duration-300 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  <span>Add Content</span>
                </button>

                {showAddContent && (
                  <div className="p-4 bg-black/60 border-2 border-neon-green/30 rounded-xl animate-fadeIn">
                    <input
                      type="text"
                      placeholder="Enter URL or upload file..."
                      className="w-full px-4 py-3 bg-black/80 border border-neon-green/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                    />
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-neon-green/20">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span>3 documents uploaded</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-neon-green/5 border border-neon-green/20 rounded-lg hover:bg-neon-green/10 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300 group-hover:text-neon-green transition-colors">agent_script_v2.pdf</span>
                      <FileText className="w-4 h-4 text-neon-green/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="h-full bg-black/60 border-2 border-neon-green/20 rounded-xl p-6 hover:border-neon-green/40 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-neon-green">agent_script_v2.pdf</h4>
                  <span className="text-xs text-gray-500 bg-neon-green/10 px-3 py-1 rounded-full">Editable</span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[400px] bg-transparent text-gray-300 leading-relaxed font-mono text-sm resize-none focus:outline-none focus:text-white transition-colors"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                />
              </div>
            </div>
          </>
        );

      case 'actions':
        return (
          <div className="md:col-span-5 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {mockContent['actions'].title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {mockContent['actions'].subtitle}
                  </p>
                </div>

                <button className="w-full px-5 py-4 bg-neon-green text-black rounded-xl font-bold hover:bg-neon-green/90 hover:shadow-lg hover:shadow-neon-green/50 transition-all">
                  <Plus className="w-5 h-5 inline mr-2" />
                  Add New Action
                </button>

                <div className="space-y-3">
                  <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/40 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-neon-green" />
                        <div>
                          <p className="text-white font-medium">Send to CRM</p>
                          <p className="text-xs text-gray-400">Salesforce Integration</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/40 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-neon-green" />
                        <div>
                          <p className="text-white font-medium">Book Appointment</p>
                          <p className="text-xs text-gray-400">Calendly API</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-black/60 border-2 border-gray-700 rounded-xl hover:border-neon-green/40 transition-colors cursor-pointer opacity-60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">Send SMS</p>
                          <p className="text-xs text-gray-400">Inactive</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 border-2 border-neon-green/20 rounded-xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">Action Configuration</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Action Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Send to CRM"
                      className="w-full px-4 py-3 bg-black/80 border border-neon-green/30 rounded-lg text-white focus:outline-none focus:border-neon-green transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Trigger
                    </label>
                    <select className="w-full px-4 py-3 bg-black/80 border border-neon-green/30 rounded-lg text-white focus:outline-none focus:border-neon-green transition-all">
                      <option>When call ends</option>
                      <option>When appointment booked</option>
                      <option>When lead qualified</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      API Endpoint
                    </label>
                    <input
                      type="text"
                      placeholder="https://api.example.com/webhook"
                      className="w-full px-4 py-3 bg-black/80 border border-neon-green/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-neon-green transition-all"
                    />
                  </div>

                  <button className="w-full px-6 py-3 bg-neon-green/10 border-2 border-neon-green/30 rounded-xl text-neon-green font-medium hover:bg-neon-green/20 hover:border-neon-green/50 transition-all">
                    Test Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'test-calls':
        return (
          <div className="md:col-span-5 animate-fadeIn">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {mockContent['test-calls'].title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {mockContent['test-calls'].subtitle}
                  </p>
                </div>

                <div className="bg-black/60 border-2 border-neon-green/20 rounded-xl p-6">
                  <div className="flex items-center justify-center py-12">
                    <button className="group">
                      <div className="w-24 h-24 bg-neon-green rounded-full flex items-center justify-center hover:bg-neon-green/90 hover:shadow-2xl hover:shadow-neon-green/50 transition-all duration-300 hover:scale-110">
                        <Phone className="w-12 h-12 text-black" />
                      </div>
                      <p className="text-white font-bold mt-4">Start Test Call</p>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-400">Recent Test Calls</h4>

                  <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Test Call #1</span>
                      <span className="text-xs text-neon-green bg-neon-green/10 px-2 py-1 rounded">Successful</span>
                    </div>
                    <p className="text-xs text-gray-400">Duration: 2:34 • 5 minutes ago</p>
                  </div>

                  <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Test Call #2</span>
                      <span className="text-xs text-neon-green bg-neon-green/10 px-2 py-1 rounded">Successful</span>
                    </div>
                    <p className="text-xs text-gray-400">Duration: 1:47 • 15 minutes ago</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">Test Scenarios</h4>

                <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/40 transition-colors cursor-pointer">
                  <p className="text-white font-medium mb-1">Qualified Lead</p>
                  <p className="text-xs text-gray-400">Interested buyer, ready to book</p>
                </div>

                <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/40 transition-colors cursor-pointer">
                  <p className="text-white font-medium mb-1">Cold Lead</p>
                  <p className="text-xs text-gray-400">Just browsing, not ready</p>
                </div>

                <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/40 transition-colors cursor-pointer">
                  <p className="text-white font-medium mb-1">Difficult Caller</p>
                  <p className="text-xs text-gray-400">Challenging questions</p>
                </div>

                <div className="p-4 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/40 transition-colors cursor-pointer">
                  <p className="text-white font-medium mb-1">Price Objection</p>
                  <p className="text-xs text-gray-400">Concerned about cost</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-white">AI Agent</span> <span className="text-neon-green">Dashboard</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Configure, train, and deploy your AI voice agents with our intuitive dashboard interface
          </p>
        </div>

        <div className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-neon-green/20 overflow-hidden shadow-2xl shadow-neon-green/10">
          <div className="flex flex-wrap gap-1 p-4 bg-black/60 border-b border-neon-green/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-neon-green text-black shadow-lg shadow-neon-green/50'
                    : 'bg-transparent text-gray-400 hover:text-neon-green hover:bg-neon-green/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-5 gap-6 p-6 md:p-8 min-h-[500px]">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {showFlowTemplates && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-black border-2 border-neon-green/30 rounded-2xl p-8 max-w-4xl w-full shadow-2xl shadow-neon-green/20 animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Choose a Flow Template</h3>
              <button
                onClick={() => setShowFlowTemplates(false)}
                className="text-gray-400 hover:text-neon-green transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/50 transition-all cursor-pointer group">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-green transition-colors">Lead Qualification Flow</h4>
                <p className="text-sm text-gray-400 mb-4">Standard flow for qualifying inbound leads with budget and timeline questions</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>• Greeting & Introduction</div>
                  <div>• Qualify Budget</div>
                  <div>• Assess Timeline</div>
                  <div>• Book Appointment</div>
                </div>
              </div>

              <div className="p-6 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/50 transition-all cursor-pointer group">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-green transition-colors">Appointment Booking Flow</h4>
                <p className="text-sm text-gray-400 mb-4">Streamlined flow focused on scheduling appointments quickly</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>• Greeting</div>
                  <div>• Check Calendar Availability</div>
                  <div>• Confirm Details</div>
                  <div>• Send Confirmation</div>
                </div>
              </div>

              <div className="p-6 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/50 transition-all cursor-pointer group">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-green transition-colors">Customer Support Flow</h4>
                <p className="text-sm text-gray-400 mb-4">Handle common customer inquiries and route to specialists</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>• Identify Issue</div>
                  <div>• Check Knowledge Base</div>
                  <div>• Provide Solution or Route</div>
                  <div>• Follow-up Confirmation</div>
                </div>
              </div>

              <div className="p-6 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/50 transition-all cursor-pointer group">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-green transition-colors">Sales Discovery Flow</h4>
                <p className="text-sm text-gray-400 mb-4">Discover customer needs and present solutions</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>• Understand Pain Points</div>
                  <div>• Present Solutions</div>
                  <div>• Handle Objections</div>
                  <div>• Close or Follow-up</div>
                </div>
              </div>

              <div className="p-6 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/50 transition-all cursor-pointer group">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-green transition-colors">Survey & Feedback Flow</h4>
                <p className="text-sm text-gray-400 mb-4">Collect customer feedback and satisfaction ratings</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>• Introduction & Permission</div>
                  <div>• Ask Rating Questions</div>
                  <div>• Collect Open Feedback</div>
                  <div>• Thank You & Incentive</div>
                </div>
              </div>

              <div className="p-6 bg-black/60 border-2 border-neon-green/20 rounded-xl hover:border-neon-green/50 transition-all cursor-pointer group">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-green transition-colors">Follow-up & Re-engagement</h4>
                <p className="text-sm text-gray-400 mb-4">Re-engage cold leads and dormant customers</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div>• Check In</div>
                  <div>• Present New Offers</div>
                  <div>• Address Previous Concerns</div>
                  <div>• Set Next Steps</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowFlowTemplates(false)}
                className="w-full px-6 py-3 bg-neon-green text-black rounded-xl font-bold hover:bg-neon-green/90 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showPDFModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-black border-2 border-neon-green/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl shadow-neon-green/20 animate-scaleIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Uploaded Document</h3>
              <button
                onClick={() => setShowPDFModal(false)}
                className="text-gray-400 hover:text-neon-green transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-neon-green/5 border border-neon-green/20 rounded-xl">
                <FileText className="w-10 h-10 text-neon-green" />
                <div>
                  <p className="font-bold text-white">agent_script_v2.pdf</p>
                  <p className="text-sm text-gray-400">Uploaded 2 days ago • 245 KB</p>
                </div>
              </div>
              <button
                onClick={() => setShowPDFModal(false)}
                className="w-full px-6 py-3 bg-neon-green text-black rounded-xl font-bold hover:bg-neon-green/90 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
