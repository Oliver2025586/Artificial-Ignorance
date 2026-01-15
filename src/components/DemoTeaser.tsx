import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { generateSpeech, cleanupAudioUrl, VOICE_IDS } from '../utils/elevenLabsService';

const sampleTexts = [
  "Hi there! Your AI is answering calls 24/7 so you never miss another lead.",
  "Ready to book a meeting? I can sync your calendar and confirm right now.",
  "Thanks for calling! Let me connect you to the right person with full context."
];

interface VoiceOption {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  age: 'Young' | 'Middle Aged' | 'Old';
  accent: string;
  description: string;
}

const voiceOptions: VoiceOption[] = [
  { id: VOICE_IDS.ALICE, name: 'Alice', gender: 'Female', age: 'Middle Aged', accent: 'British', description: 'Refined British accent' },
  { id: VOICE_IDS.LILY, name: 'Lily', gender: 'Female', age: 'Young', accent: 'British', description: 'Warm British voice' },
  { id: VOICE_IDS.RACHEL, name: 'Rachel', gender: 'Female', age: 'Young', accent: 'American', description: 'Energetic American voice' },
  { id: VOICE_IDS.CHARLIE, name: 'Charlie', gender: 'Male', age: 'Middle Aged', accent: 'British', description: 'Confident British voice' },
  { id: VOICE_IDS.GEORGE, name: 'George', gender: 'Male', age: 'Middle Aged', accent: 'British', description: 'Strong British accent' },
  { id: VOICE_IDS.DANIEL, name: 'Daniel', gender: 'Male', age: 'Middle Aged', accent: 'British', description: 'Deep British voice' },
  { id: VOICE_IDS.JOSH, name: 'Josh', gender: 'Male', age: 'Young', accent: 'American', description: 'Casual American voice' },
  { id: VOICE_IDS.ADAM, name: 'Adam', gender: 'Male', age: 'Middle Aged', accent: 'American', description: 'Professional American voice' },
];

export default function DemoTeaser() {
  const [text, setText] = useState(sampleTexts[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSample, setSelectedSample] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState(voiceOptions[0].id);
  const [filterGender, setFilterGender] = useState<string>('All');
  const [filterAccent, setFilterAccent] = useState<string>('All');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredVoices = voiceOptions.filter(voice => {
    const matchesGender = filterGender === 'All' || voice.gender === filterGender;
    const matchesAccent = filterAccent === 'All' || voice.accent === filterAccent;
    return matchesGender && matchesAccent;
  });

  const uniqueAccents = Array.from(new Set(voiceOptions.map(v => v.accent)));

  const handlePlay = async () => {
    if (isPaused && audioRef.current) {
      audioRef.current.play();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPaused(true);
        setIsPlaying(false);
      }
      return;
    }

    setIsLoading(true);

    try {
      const audioUrl = await generateSpeech(text, selectedVoice, 0.85);

      if (audioUrlRef.current) {
        cleanupAudioUrl(audioUrlRef.current);
      }

      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
        if (audioUrlRef.current) {
          cleanupAudioUrl(audioUrlRef.current);
          audioUrlRef.current = null;
        }
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setIsLoading(false);
        if (audioUrlRef.current) {
          cleanupAudioUrl(audioUrlRef.current);
          audioUrlRef.current = null;
        }
      };

      await audio.play();
    } catch (error) {
      console.error('Error generating speech:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleSampleSelect = (index: number) => {
    setSelectedSample(index);
    setText(sampleTexts[index]);
    if ((isPlaying || isPaused) && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  return (
    <section id="demo" className="py-24 px-6 sm:px-8 lg:px-12 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Hear It <span className="text-neon-green">Yourself</span>
          </h2>
          <p className="text-lg text-white">
            Type anything and hear how human your AI actually sounds.
          </p>
        </div>

        <div className="clean-card-dark p-8 sm:p-10">
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-3">
              Quick Samples
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleTexts.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleSelect(index)}
                  className={`px-4 py-2 text-sm rounded-lg border-2 transition-all duration-200 ${
                    selectedSample === index
                      ? 'bg-neon-green text-black border-neon-green'
                      : 'bg-black text-neon-green border-neon-green hover:bg-neon-green hover:text-black'
                  }`}
                >
                  Sample {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-3">
              Customize Voice
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">Gender</label>
                <select
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  className="w-full px-3 py-2 bg-black border-2 border-neon-green rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green"
                >
                  <option value="All">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Accent</label>
                <select
                  value={filterAccent}
                  onChange={(e) => setFilterAccent(e.target.value)}
                  className="w-full px-3 py-2 bg-black border-2 border-neon-green rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green"
                >
                  <option value="All">All Accents</option>
                  {uniqueAccents.map(accent => (
                    <option key={accent} value={accent}>{accent}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Voice</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full px-3 py-2 bg-black border-2 border-neon-green rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green"
                >
                  {filteredVoices.map(voice => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} - {voice.age} {voice.gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-3 bg-gray-900 border border-neon-green/30 rounded-lg">
              <p className="text-xs text-gray-300">
                {voiceOptions.find(v => v.id === selectedVoice)?.description}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="demo-text" className="block text-sm font-medium text-white mb-2">
              Your Text
            </label>
            <textarea
              id="demo-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-black border-2 border-neon-green rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green resize-none text-white"
              placeholder="Type or paste your text here..."
              maxLength={500}
            />
            <p className="text-xs text-neon-green mt-2">
              {text.length}/500 characters
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePlay}
              disabled={!text.trim() || isLoading}
              className={`clean-button-primary px-8 py-3 flex items-center gap-2 ${
                !text.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : isPaused ? (
                <>
                  <Play size={18} />
                  Resume
                </>
              ) : isPlaying ? (
                <>
                  <Pause size={18} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={18} />
                  Generate Voice
                </>
              )}
            </button>

            <div className="flex items-center gap-2 text-neon-green">
              <Volume2 size={18} className="text-neon-green" />
              <span className="text-sm">AI Voice Preview</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-neon-green">
            <p className="text-xs text-white text-center">
              Powered by ElevenLabs. Ultra-realistic voices with natural emotion and tone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
