import { Link2, Code, Zap } from 'lucide-react';

const integrations = [
  { name: 'GoHighLevel', logo: 'GHL' },
  { name: 'Zapier', logo: 'ZAP' },
  { name: 'Salesforce', logo: 'SF' },
  { name: 'HubSpot', logo: 'HS' },
  { name: 'Slack', logo: 'SLK' },
  { name: 'Twilio', logo: 'TWL' },
  { name: 'Make', logo: 'MKE' },
  { name: 'API', logo: 'API' }
];

const apiExample = `// Initialize AI Voice
const voice = new AIVoice({
  apiKey: 'your_api_key',
  voice: 'sarah-professional'
});

// Generate speech
const audio = await voice.generate({
  text: 'Hello, welcome!',
  emotion: 'friendly',
  speed: 1.0
});`;

export default function Integration() {
  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black border-2 border-neon-green rounded-full px-4 py-2 mb-6">
            <Link2 size={16} className="text-neon-green" />
            <span className="text-sm font-medium text-neon-green">Seamless Integration</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Plug Into <span className="text-neon-green">Everything</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Powered by Twilio, OpenAI, Google Gemini, WhatsApp, Microsoft Calendar, and more. Seamless CRM sync. Endless automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="clean-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-black border-2 border-neon-green flex items-center justify-center">
                <Zap size={20} className="text-neon-green" />
              </div>
              <h3 className="text-2xl font-bold text-black">Pre-built Integrations</h3>
            </div>

            <p className="text-black mb-8">
              Connect in minutes. Zero code. Zero headaches.
            </p>

            <div className="grid grid-cols-4 gap-4">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg border-2 border-black hover:border-neon-green flex flex-col items-center justify-center transition-all duration-200 hover:shadow-md bg-white"
                >
                  <span className="text-lg font-bold text-black mb-1">{integration.logo}</span>
                  <span className="text-xs text-black text-center px-1">{integration.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="clean-card-dark p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-black border-2 border-neon-green flex items-center justify-center">
                <Code size={20} className="text-neon-green" />
              </div>
              <h3 className="text-2xl font-bold text-white">Developer API</h3>
            </div>

            <p className="text-white mb-6">
              Need something custom? Use our API to build exactly what you need.
            </p>

            <div className="bg-black rounded-lg p-4 border-2 border-neon-green/30">
              <pre className="text-sm text-neon-green overflow-x-auto">
                <code>{apiExample}</code>
              </pre>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-lg border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-200 text-sm font-medium">
                View Docs
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-neon-green border-2 border-neon-green text-black hover:bg-black hover:text-neon-green transition-all duration-200 text-sm font-medium">
                Get API Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
