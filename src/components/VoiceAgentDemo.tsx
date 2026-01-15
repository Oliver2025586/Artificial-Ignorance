import { useState } from 'react';
import { Play, Pause, Building2, ShoppingCart, HeartPulse, Headphones, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { playRealEstateDemo, playEcommerceDemo, playHealthcareDemo, playRestaurantDemo, stopConversation, pauseConversation, resumeConversation, isConversationPaused } from '../utils/elevenLabsConversations';

const demoCards = [
  {
    id: 1,
    icon: Building2,
    industry: 'Real Estate',
    title: 'Lead Qualification - Buyer',
    description: 'British Female AI agent qualifies potential home buyers and schedules property viewings.',
    duration: '1:35',
    voiceInfo: 'Alice (British Female)'
  },
  {
    id: 2,
    icon: ShoppingCart,
    industry: 'E-Commerce',
    title: 'Order Status & Support',
    description: 'British Female handles customer inquiries about orders, tracking, and returns.',
    duration: '1:25',
    voiceInfo: 'Lily (British Female)'
  },
  {
    id: 3,
    icon: HeartPulse,
    industry: 'Healthcare',
    title: 'Appointment Scheduling',
    description: 'British Female AI books patient appointments and manages schedules professionally.',
    duration: '1:40',
    voiceInfo: 'Alice (British Female)'
  },
  {
    id: 4,
    icon: Headphones,
    industry: 'Customer Support',
    title: 'Restaurant Reservations',
    description: 'British Male AI takes reservations and handles special requests naturally.',
    duration: '1:50',
    voiceInfo: 'George (British Male)'
  },
  {
    id: 5,
    icon: Building2,
    industry: 'Sales',
    title: 'Product Demo Calls',
    description: 'American Female energetically presents product features and answers questions.',
    duration: '1:45',
    voiceInfo: 'Rachel (American Female)'
  },
  {
    id: 6,
    icon: ShoppingCart,
    industry: 'Retail',
    title: 'Customer Inquiry',
    description: 'American Male professionally handles product questions and purchase assistance.',
    duration: '1:30',
    voiceInfo: 'Adam (American Male)'
  },
  {
    id: 7,
    icon: HeartPulse,
    industry: 'Insurance',
    title: 'Policy Information',
    description: 'British Male explains coverage options and policy details with authority.',
    duration: '1:55',
    voiceInfo: 'George (British Male)'
  },
  {
    id: 8,
    icon: Headphones,
    industry: 'Tech Support',
    title: 'Technical Assistance',
    description: 'British Female guides customers through troubleshooting steps patiently.',
    duration: '2:00',
    voiceInfo: 'Lily (British Female)'
  }
];

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('demo_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('demo_session_id', sessionId);
  }
  return sessionId;
}

export default function VoiceAgentDemo() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [pausedId, setPausedId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const { user } = useAuth();

  const trackDemoPlay = async (demoId: number) => {
    const sessionId = getSessionId();

    await supabase
      .from('demo_plays')
      .insert({
        session_id: sessionId,
        user_id: user?.id || null,
        demo_id: demoId,
        played_at: new Date().toISOString()
      });
  };

  const handlePlay = async (id: number) => {
    if (pausedId === id) {
      resumeConversation();
      setPausedId(null);
      setPlayingId(id);
      return;
    }

    if (playingId === id) {
      if (isConversationPaused()) {
        resumeConversation();
        setPausedId(null);
        setPlayingId(id);
      } else {
        pauseConversation();
        setPausedId(id);
        setPlayingId(null);
      }
      return;
    }

    stopConversation();
    setLoadingId(id);
    setPausedId(null);
    setCurrentTurn(0);

    await trackDemoPlay(id);

    try {
      const demoFunctions = [
        playRealEstateDemo,
        playEcommerceDemo,
        playHealthcareDemo,
        playRestaurantDemo,
        playRealEstateDemo,
        playEcommerceDemo,
        playHealthcareDemo,
        playRestaurantDemo
      ];

      const demoFunction = demoFunctions[id - 1];
      if (demoFunction) {
        setPlayingId(id);
        setLoadingId(null);
        await demoFunction((turn) => setCurrentTurn(turn));
      }

      setPlayingId(null);
      setPausedId(null);
      setLoadingId(null);
      setCurrentTurn(0);
    } catch (error) {
      console.error('Speech playback error:', error);
      setPlayingId(null);
      setPausedId(null);
      setLoadingId(null);
      setCurrentTurn(0);
    }
  };

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Hear AI Voice Agents in <span className="text-neon-green">Action</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Choose a call type to see how Artificial Ignorance AI handles real conversations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoCards.map((card) => {
            const Icon = card.icon;
            const isPlaying = playingId === card.id;
            const isPaused = pausedId === card.id;
            const isLoading = loadingId === card.id;

            return (
              <div
                key={card.id}
                className="group bg-black border-2 border-white rounded-xl p-6 hover:border-neon-green hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-black border-2 border-neon-green flex items-center justify-center group-hover:bg-neon-green transition-all duration-300">
                    <Icon size={24} className="text-neon-green group-hover:text-black transition-colors duration-300" />
                  </div>
                  <span className="text-xs text-neon-green border border-neon-green rounded-full px-2 py-1">
                    {card.duration}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-neon-green font-medium mb-2">{card.industry}</p>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-green transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed mb-2">
                    {card.description}
                  </p>
                  <p className="text-xs text-neon-green/70 italic">
                    Voice: {card.voiceInfo}
                  </p>
                </div>

                <div className="space-y-2">
                  {(isPlaying || isPaused || isLoading) && (
                    <div className="flex items-center gap-2 text-xs text-neon-green">
                      {isLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Loading conversation...</span>
                        </>
                      ) : isPaused ? (
                        <>
                          <Pause size={14} />
                          <span>Paused</span>
                        </>
                      ) : (
                        <>
                          <div className="flex gap-1">
                            <div className="w-1 h-3 bg-neon-green animate-pulse" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1 h-3 bg-neon-green animate-pulse" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1 h-3 bg-neon-green animate-pulse" style={{ animationDelay: '300ms' }}></div>
                          </div>
                          <span>Playing conversation...</span>
                        </>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => handlePlay(card.id)}
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-200 font-medium ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isPaused ? (
                      <>
                        <Play size={16} />
                        <span>Resume</span>
                      </>
                    ) : isPlaying ? (
                      <>
                        <Pause size={16} />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>Play Demo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
