const featuredLogos = [
  { name: 'HubSpot', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg' },
  { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Twilio', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg' },
  { name: 'OpenAI', url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
  { name: 'Claude by Anthropic', url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg' },
  { name: 'GoHighLevel', url: 'https://images.leadconnectorhq.com/img/agency-app-store/gohighlevel_WkAU70O.png' },
  { name: 'n8n', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/N8n-logo-new.svg' },
  { name: 'Pipedrive CRM', url: 'https://logosarchive.com/wp-content/uploads/2021/08/Pipedrive-logo.svg' },
  { name: 'DeepSeek', url: 'https://logosarchive.com/wp-content/uploads/2025/01/Deepseek-logo.svg' },
  { name: 'Grok by xAI', url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/X.AI_logo.png' },
  { name: 'Retell AI', url: 'https://www.retellai.com/favicon/apple-icon.png' },
];

export default function TrustLogos() {
  return (
    <section className="py-16 px-6 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-gray-600 uppercase tracking-wider mb-12">
          Trusted by innovative companies worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {featuredLogos.slice(0, 6).map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center h-16 hover:scale-110 transition-all duration-300"
            >
              <img
                src={logo.url}
                alt={`${logo.name} Logo`}
                className="h-10 w-auto object-contain max-w-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
