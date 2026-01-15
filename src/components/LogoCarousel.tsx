const featuredLogos = [
  { name: 'HubSpot', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg', scale: 'normal' },
  { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', scale: 'normal' },
  { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', scale: 'normal' },
  { name: 'Twilio', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg', scale: 'normal' },
  { name: 'OpenAI', url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', scale: 'normal' },
  { name: 'DeepSeek', url: 'https://logosarchive.com/wp-content/uploads/2025/01/Deepseek-logo.svg', scale: 'normal' },
  { name: 'Claude by Anthropic', url: '/claude-ai-logo-d862.png', scale: 'large' },
  { name: 'GoHighLevel', url: '/OIP (1).webp', scale: 'large' },
  { name: 'Grok by xAI', url: '/OIP (2).webp', scale: 'large' },
  { name: 'n8n', url: '/OIP (3).webp', scale: 'large' },
  { name: 'Pipedrive CRM', url: 'https://logosarchive.com/wp-content/uploads/2021/08/Pipedrive-logo.svg', scale: 'normal' },
  { name: 'Retell AI', url: '/OIP (4).webp', scale: 'large' },
];

export default function LogoCarousel() {
  return (
    <section className="py-16 px-6 bg-white border-b-2 border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-8">
        <p className="text-center text-sm font-medium text-gray-800 uppercase tracking-wide">
          Built with industry leaders
        </p>
      </div>

      <div className="relative">
        <div className="flex space-x-16 animate-scroll">
          {[...featuredLogos, ...featuredLogos, ...featuredLogos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 w-56 h-36 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <img
                src={logo.url}
                alt={`${logo.name} Logo`}
                className={`w-auto object-contain max-w-full ${
                  logo.scale === 'large' ? 'h-32' : 'h-12'
                }`}
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
