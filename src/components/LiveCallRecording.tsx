import { Play, Volume2 } from 'lucide-react';
import { useState } from 'react';

const callRecordings = [
  {
    id: 1,
    title: 'Dentist Appointment Booking',
    description: 'Patient scheduling routine dental appointment',
    tags: ['Healthcare', 'Scheduling', 'Inbound'],
    trackId: '2108913264'
  },
  {
    id: 2,
    title: 'EV Battery Manufacturer Cold Call',
    description: 'B2B outreach to large business owner',
    tags: ['B2B', 'Cold Call', 'Sales'],
    trackId: '2086078731'
  },
  {
    id: 3,
    title: 'Successful Cold Call - Deal Closed',
    description: 'AI closes the sale on first contact',
    tags: ['Sales', 'Cold Call', 'Conversion'],
    trackId: '2086035480'
  }
];

export default function LiveCallRecording() {
  const [selectedCall, setSelectedCall] = useState(callRecordings[0]);

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green mb-6">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
            <span className="text-sm font-medium text-neon-green">REAL CALL RECORDINGS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Hear Our AI in <span className="text-neon-green">Real Calls</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Listen to actual conversations with our AI voice agents handling real business scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {callRecordings.map((call) => (
            <button
              key={call.id}
              onClick={() => setSelectedCall(call)}
              className={`text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedCall.id === call.id
                  ? 'bg-neon-green/10 border-neon-green shadow-[0_0_30px_rgba(0,255,0,0.2)]'
                  : 'bg-black/30 border-white/10 hover:border-neon-green/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center">
                  <Volume2 size={20} className="text-neon-green" />
                </div>
                {selectedCall.id === call.id && (
                  <div className="px-2 py-1 rounded-full bg-neon-green text-black text-xs font-bold">
                    PLAYING
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{call.title}</h3>
              <p className="text-sm text-white/60 mb-3">{call.description}</p>
              <div className="flex flex-wrap gap-2">
                {call.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-transparent blur-3xl -z-10"></div>

          <div className="bg-black/50 backdrop-blur-sm border-2 border-neon-green rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,255,0,0.2)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-green/5 border border-neon-green/30">
                <Play size={16} className="text-neon-green" />
                <span className="text-sm font-medium text-white">Now Playing</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-neon-green/50 to-transparent"></div>
            </div>

            <div className="relative rounded-xl overflow-hidden border-2 border-neon-green/30 bg-black/30">
              <iframe
                key={selectedCall.trackId}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${selectedCall.trackId}&color=%2300ff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`}
                className="w-full"
              ></iframe>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-neon-green/5 border border-neon-green/20">
                <div className="text-2xl font-bold text-neon-green mb-1">100%</div>
                <div className="text-sm text-white/70">Natural Sounding</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-neon-green/5 border border-neon-green/20">
                <div className="text-2xl font-bold text-neon-green mb-1">Real</div>
                <div className="text-sm text-white/70">Customer Calls</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-neon-green/5 border border-neon-green/20">
                <div className="text-2xl font-bold text-neon-green mb-1">Live</div>
                <div className="text-sm text-white/70">In Production</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            These are unedited recordings from our live system handling real customer inquiries
          </p>
        </div>
      </div>
    </section>
  );
}
