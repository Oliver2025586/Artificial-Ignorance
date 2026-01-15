import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TypingAnimation from './TypingAnimation';
import NetworkAnimation from './NetworkAnimation';

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  const { user } = useAuth();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>

        <NetworkAnimation />

        {[...Array(6)].map((_, i) => {
          const positions = [
            { left: '10%', top: '20%', size: 250 },
            { left: '80%', top: '15%', size: 200 },
            { left: '20%', top: '70%', size: 300 },
            { left: '75%', top: '65%', size: 180 },
            { left: '50%', top: '40%', size: 220 },
            { left: '35%', top: '85%', size: 240 }
          ];
          const pos = positions[i];
          const duration = 8 + i * 1.5;
          const delay = i * 1.2;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-neon-green mix-blend-screen will-change-transform"
              style={{
                width: `${pos.size}px`,
                height: `${pos.size}px`,
                left: pos.left,
                top: pos.top,
                opacity: 0.12,
                filter: 'blur(80px)',
                animation: `float-orb ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm border-2 border-neon-green rounded-full px-4 py-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
          <span className="text-sm font-medium text-neon-green">Now available for beta access</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          <TypingAnimation words={[
            'Close More Sales',
            'Never Miss an Opportunity',
            'Win 348% More Sales',
            'Grow Your Business 10x Faster'
          ]} />
        </h1>

        <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-12 leading-relaxed">
          Your best customers call at the worst times. Now every call gets answered, every question gets solved, and every opportunity gets captured—automatically.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="clean-button-primary px-8 py-4 text-lg font-semibold"
          >
            See It In Action
          </Link>

          <button
            onClick={() => user ? scrollToSection('demo') : window.location.href = '/signup'}
            className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200"
          >
            Book Your Free Demo
          </button>
        </div>

        <p className="text-sm text-white mt-8">
          No contracts. No commitments. Just results.
        </p>
      </div>
    </section>
  );
}
