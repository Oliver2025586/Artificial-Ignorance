import { Sparkles } from 'lucide-react';

const benefits = [
  '24/7 AI Agents',
  'Instant Call Handling',
  'WhatsApp + SMS Integration',
  'Free CRM Included',
  'Calendar Sync Built-In',
  'Never Miss a Lead',
  'AI Closes Sales for You',
  'Powered by Twilio, OpenAI & Gemini',
  'More Sales. Less Work.',
  'Smart Follow-Ups on Autopilot',
];

export default function InfiniteRibbon() {
  return (
    <div className="relative w-full overflow-hidden my-20">
      <div className="ribbon-slant-container">
        <div className="ribbon-container group">
          <div className="ribbon-content animate-scroll-ribbon group-hover:pause-animation">
            {[...benefits, ...benefits, ...benefits].map((benefit, index) => (
              <div key={index} className="inline-flex items-center whitespace-nowrap">
                <span className="text-[#00FF00] font-bold text-2xl md:text-3xl tracking-wide neon-text px-8">
                  {benefit}
                </span>
                <Sparkles className="w-6 h-6 text-white inline-block glow-icon" />
              </div>
            ))}
          </div>
          <div className="ribbon-content animate-scroll-ribbon group-hover:pause-animation" aria-hidden="true">
            {[...benefits, ...benefits, ...benefits].map((benefit, index) => (
              <div key={`duplicate-${index}`} className="inline-flex items-center whitespace-nowrap">
                <span className="text-[#00FF00] font-bold text-2xl md:text-3xl tracking-wide neon-text px-8">
                  {benefit}
                </span>
                <Sparkles className="w-6 h-6 text-white inline-block glow-icon" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
