import { useState } from 'react';
import { Play, Loader2, Sparkles, Volume2, Sliders, Mic } from 'lucide-react';
import { generateSpeech, cleanupAudioUrl, VOICE_IDS, VoiceSettings } from '../utils/elevenLabsService';

interface MoodPreset {
  name: string;
  icon: string;
  description: string;
  settings: VoiceSettings;
}

const moodPresets: MoodPreset[] = [
  {
    name: 'Professional',
    icon: '💼',
    description: 'Confident and authoritative',
    settings: { stability: 0.7, similarityBoost: 0.8, style: 0.3, speed: 1.0, useSpeakerBoost: true }
  },
  {
    name: 'Friendly',
    icon: '😊',
    description: 'Warm and approachable',
    settings: { stability: 0.5, similarityBoost: 0.75, style: 0.6, speed: 1.0, useSpeakerBoost: true }
  },
  {
    name: 'Energetic',
    icon: '⚡',
    description: 'Exciting and dynamic',
    settings: { stability: 0.3, similarityBoost: 0.7, style: 0.8, speed: 1.15, useSpeakerBoost: true }
  },
  {
    name: 'Calm',
    icon: '🧘',
    description: 'Soothing and relaxed',
    settings: { stability: 0.8, similarityBoost: 0.75, style: 0.2, speed: 0.9, useSpeakerBoost: false }
  },
  {
    name: 'Authoritative',
    icon: '👔',
    description: 'Commanding presence',
    settings: { stability: 0.75, similarityBoost: 0.85, style: 0.4, speed: 0.95, useSpeakerBoost: true }
  },
  {
    name: 'Conversational',
    icon: '💬',
    description: 'Natural and casual',
    settings: { stability: 0.4, similarityBoost: 0.7, style: 0.7, speed: 1.05, useSpeakerBoost: true }
  },
  {
    name: 'Dramatic',
    icon: '🎭',
    description: 'Expressive and theatrical',
    settings: { stability: 0.3, similarityBoost: 0.8, style: 0.9, speed: 1.0, useSpeakerBoost: true }
  },
  {
    name: 'Storytelling',
    icon: '📖',
    description: 'Engaging narrative style',
    settings: { stability: 0.6, similarityBoost: 0.75, style: 0.65, speed: 0.95, useSpeakerBoost: true }
  }
];

const availableVoices = [
  { id: 'alice', name: 'Alice', accent: 'British', voiceId: VOICE_IDS.ALICE, gender: 'Female' },
  { id: 'george', name: 'George', accent: 'British', voiceId: VOICE_IDS.GEORGE, gender: 'Male' },
  { id: 'rachel', name: 'Rachel', accent: 'American', voiceId: VOICE_IDS.RACHEL, gender: 'Female' },
  { id: 'adam', name: 'Adam', accent: 'American', voiceId: VOICE_IDS.ADAM, gender: 'Male' }
];

export default function VoiceShowcase() {
  const [showSettings, setShowSettings] = useState(false);
  const [customText, setCustomText] = useState('');
  const [selectedMood, setSelectedMood] = useState(moodPresets[0]);
  const [selectedVoice, setSelectedVoice] = useState(availableVoices[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    speed: 1.0,
    stability: 0.5,
    similarityBoost: 0.75,
    style: 0.5,
    useSpeakerBoost: true
  });

  const applyMoodPreset = (mood: MoodPreset) => {
    console.log(`Applying mood preset: ${mood.name}`, mood.settings);
    setSelectedMood(mood);
    setVoiceSettings(mood.settings);
  };

  const handleGenerate = async () => {
    if (!customText.trim()) {
      alert('Please enter some text to convert to speech');
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsPlaying(false);
    }

    setIsGenerating(true);

    try {
      console.log('Generating speech with settings:', voiceSettings);
      console.log('Selected mood:', selectedMood.name);

      const audioUrl = await generateSpeech(customText, selectedVoice.voiceId, voiceSettings);

      const audio = new Audio(audioUrl);

      // Apply speed setting through playbackRate
      if (voiceSettings.speed) {
        audio.playbackRate = voiceSettings.speed;
        console.log('Applied playback rate:', voiceSettings.speed);
      }

      setCurrentAudio(audio);
      setIsGenerating(false);
      setIsPlaying(true);

      audio.onended = () => {
        cleanupAudioUrl(audioUrl);
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      audio.onerror = () => {
        cleanupAudioUrl(audioUrl);
        setIsPlaying(false);
        setIsGenerating(false);
        setCurrentAudio(null);
      };

      await audio.play();
    } catch (error) {
      console.error('Error generating speech:', error);
      setIsGenerating(false);
      setIsPlaying(false);
      alert('Failed to generate speech. Please check your API credits or try again.');
    }
  };

  const handleStop = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white border-y-2 border-neon-green">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6">
            Text to <span className="text-neon-green">Speech</span> Converter
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Transform your text into natural-sounding speech with advanced AI voices and customization options.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-8 bg-white border-2 border-black rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-neon-green" />
                <h3 className="text-lg font-bold text-black">Voice Customization</h3>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-neon-green rounded-lg hover:bg-black/90 transition-colors border-2 border-neon-green"
              >
                <Sliders size={16} />
                {showSettings ? 'Hide' : 'Show'} Advanced
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-3">Select Voice</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableVoices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                      selectedVoice.id === voice.id
                        ? 'bg-neon-green/10 border-neon-green'
                        : 'bg-white border-black hover:border-neon-green'
                    }`}
                  >
                    <div className="font-bold text-black text-sm mb-1">{voice.name}</div>
                    <div className="text-xs text-black/70">{voice.accent}</div>
                    <div className="text-xs text-black/50">{voice.gender}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-3">Enter Text</label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type or paste your text here to convert it to speech..."
                className="w-full px-4 py-3 bg-white border-2 border-black rounded-lg text-black focus:outline-none focus:border-neon-green resize-none"
                rows={5}
              />
              <div className="mt-2 text-xs text-black/50">
                {customText.length} characters
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-neon-green" />
                <label className="block text-sm font-medium text-black">Mood Presets</label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {moodPresets.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => applyMoodPreset(mood)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedMood.name === mood.name
                        ? 'bg-neon-green/10 border-neon-green'
                        : 'bg-white border-black hover:border-neon-green'
                    }`}
                  >
                    <div className="text-2xl mb-2">{mood.icon}</div>
                    <div className="font-bold text-black text-sm mb-1">{mood.name}</div>
                    <div className="text-xs text-black/70">{mood.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {showSettings && (
              <div className="space-y-4 pt-6 border-t-2 border-black/10">
                <div className="flex items-center gap-2 mb-4">
                  <Sliders size={16} className="text-neon-green" />
                  <h4 className="text-sm font-bold text-black">Advanced Settings</h4>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-black">Speed</label>
                    <span className="text-sm text-neon-green font-bold">{voiceSettings.speed?.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={voiceSettings.speed}
                    onChange={(e) => setVoiceSettings({ ...voiceSettings, speed: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-black/50 mt-1">
                    <span>Slower</span>
                    <span>Faster</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-black">Stability</label>
                    <span className="text-sm text-neon-green font-bold">{voiceSettings.stability?.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={voiceSettings.stability}
                    onChange={(e) => setVoiceSettings({ ...voiceSettings, stability: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-black/50 mt-1">
                    <span>Variable</span>
                    <span>Consistent</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-black">Clarity (Similarity Boost)</label>
                    <span className="text-sm text-neon-green font-bold">{voiceSettings.similarityBoost?.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={voiceSettings.similarityBoost}
                    onChange={(e) => setVoiceSettings({ ...voiceSettings, similarityBoost: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-black/50 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-black">Style Exaggeration</label>
                    <span className="text-sm text-neon-green font-bold">{voiceSettings.style?.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={voiceSettings.style}
                    onChange={(e) => setVoiceSettings({ ...voiceSettings, style: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-black/50 mt-1">
                    <span>Subtle</span>
                    <span>Expressive</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border-2 border-black rounded-lg">
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-neon-green" />
                    <label className="text-sm font-medium text-black">Speaker Boost</label>
                  </div>
                  <button
                    onClick={() => setVoiceSettings({ ...voiceSettings, useSpeakerBoost: !voiceSettings.useSpeakerBoost })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      voiceSettings.useSpeakerBoost ? 'bg-neon-green' : 'bg-black/20'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        voiceSettings.useSpeakerBoost ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || isPlaying || !customText.trim()}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-neon-green text-black rounded-lg font-bold text-lg transition-all duration-200 border-2 border-black ${
                  isGenerating || isPlaying || !customText.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-neon-green/80 hover:scale-105'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <Play size={20} />
                    <span>Playing...</span>
                  </>
                ) : (
                  <>
                    <Mic size={20} />
                    <span>Generate Speech</span>
                  </>
                )}
              </button>
              {isPlaying && (
                <button
                  onClick={handleStop}
                  className="px-8 py-4 bg-black text-neon-green rounded-lg font-bold text-lg hover:bg-black/90 transition-all duration-200 border-2 border-neon-green"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #39FF14;
          cursor: pointer;
          border: 2px solid #000;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #39FF14;
          cursor: pointer;
          border: 2px solid #000;
        }
      `}</style>
    </section>
  );
}
