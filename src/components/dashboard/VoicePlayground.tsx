import { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, Mic, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { generateSpeech, cleanupAudioUrl, VOICE_IDS } from '../../utils/elevenLabsService';

interface VoicePlaygroundProps {
  onUpgradeClick: () => void;
}

const VOICE_OPTIONS = [
  { id: VOICE_IDS.GEORGE, name: 'George', description: 'British Male - Strong Native Accent', free: true },
  { id: VOICE_IDS.RACHEL, name: 'Rachel', description: 'Professional female voice', free: true },
  { id: VOICE_IDS.ADAM, name: 'Adam', description: 'Professional male voice', free: false },
  { id: VOICE_IDS.DANIEL, name: 'Daniel', description: 'British Male - Deep Voice', free: false },
];

const FREE_USAGE_LIMIT = 20;

export default function VoicePlayground({ onUpgradeClick }: VoicePlaygroundProps) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(VOICE_IDS.GEORGE);
  const [isPlaying, setIsPlaying] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (user) {
      loadUsage();
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (audioUrlRef.current) {
        cleanupAudioUrl(audioUrlRef.current);
      }
    };
  }, []);

  const loadUsage = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('preferences')
        .eq('id', user.id)
        .maybeSingle();

      if (data?.preferences?.voice_usage) {
        setUsageCount(data.preferences.voice_usage);
      }
    } catch (error) {
      console.error('Error loading usage:', error);
    }
  };

  const updateUsage = async () => {
    if (!user) return;

    const newCount = usageCount + 1;

    try {
      const { data: currentData } = await supabase
        .from('user_profiles')
        .select('preferences')
        .eq('id', user.id)
        .maybeSingle();

      const currentPrefs = currentData?.preferences || {};

      await supabase
        .from('user_profiles')
        .update({
          preferences: {
            ...currentPrefs,
            voice_usage: newCount
          }
        })
        .eq('id', user.id);

      setUsageCount(newCount);
    } catch (error) {
      console.error('Error updating usage:', error);
    }
  };

  const handlePlay = async () => {
    if (!text.trim()) return;

    if (usageCount >= FREE_USAGE_LIMIT) {
      onUpgradeClick();
      return;
    }

    const selectedVoiceOption = VOICE_OPTIONS.find(v => v.id === selectedVoice);
    if (selectedVoiceOption && !selectedVoiceOption.free) {
      onUpgradeClick();
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (audioUrlRef.current) {
        cleanupAudioUrl(audioUrlRef.current);
        audioUrlRef.current = null;
      }

      const audioUrl = await generateSpeech(text, selectedVoice);
      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setLoading(false);
      };

      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
        setLoading(false);
      };

      await audio.play();
      setIsPlaying(true);
      setLoading(false);

      await updateUsage();
    } catch (error: any) {
      console.error('Error playing voice:', error);
      setError(error.message || 'Failed to generate speech');
      setIsPlaying(false);
      setLoading(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setLoading(false);
  };

  const remainingUses = Math.max(0, FREE_USAGE_LIMIT - usageCount);
  const usagePercentage = (usageCount / FREE_USAGE_LIMIT) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-neon-green" />
              Voice Playground
            </h3>
            <p className="text-sm text-zinc-400 mt-1">Test our AI voices powered by ElevenLabs</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${usageCount >= FREE_USAGE_LIMIT ? 'text-red-400' : 'text-neon-green'}`}>
              {remainingUses}
            </div>
            <p className="text-xs text-zinc-500">Uses remaining</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-300">Usage Limit</label>
            <span className="text-xs text-zinc-500">{usageCount} / {FREE_USAGE_LIMIT}</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                usagePercentage >= 100 ? 'bg-red-500' : usagePercentage >= 75 ? 'bg-yellow-500' : 'bg-gradient-to-r from-neon-green to-emerald-400'
              }`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
        </div>

        {usageCount >= FREE_USAGE_LIMIT && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-sm text-red-400 mb-2">You've reached your free usage limit</p>
            <button
              onClick={onUpgradeClick}
              className="text-sm text-neon-green hover:text-emerald-400 font-medium transition-colors"
            >
              Upgrade for unlimited access →
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Select Voice
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VOICE_OPTIONS.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => voice.free && setSelectedVoice(voice.id)}
                  disabled={!voice.free}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedVoice === voice.id
                      ? 'bg-neon-green/10 border-neon-green'
                      : voice.free
                      ? 'bg-zinc-800/30 border-zinc-700 hover:border-zinc-600'
                      : 'bg-zinc-800/10 border-zinc-800 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${selectedVoice === voice.id ? 'text-neon-green' : 'text-white'}`}>
                      {voice.name}
                    </span>
                    {!voice.free && <Lock className="w-4 h-4 text-zinc-500" />}
                  </div>
                  <p className="text-xs text-zinc-400">{voice.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Text to Speak
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert to speech... (Max 200 characters)"
              maxLength={200}
              rows={4}
              className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-zinc-500">{text.length} / 200 characters</span>
            </div>
          </div>

          <div className="flex gap-3">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                disabled={!text.trim() || loading || usageCount >= FREE_USAGE_LIMIT}
                className="flex-1 py-3 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-semibold rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play Voice
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Square className="w-5 h-5" />
                Stop
              </button>
            )}
            <button
              onClick={onUpgradeClick}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Unlock All
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-neon-green/10 to-emerald-400/10 border border-neon-green/30 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Unlock Premium Voices
        </h4>
        <p className="text-sm text-zinc-400 mb-4">
          Upgrade to access all premium voices, unlimited usage, and advanced voice customization options powered by ElevenLabs
        </p>
        <button
          onClick={onUpgradeClick}
          className="px-6 py-2 bg-gradient-to-r from-neon-green to-emerald-400 text-black font-semibold rounded-lg hover:scale-[1.02] transition-all"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
