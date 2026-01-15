import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 136, 0.05) 25%, rgba(0, 255, 136, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, 0.05) 75%, rgba(0, 255, 136, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 136, 0.05) 25%, rgba(0, 255, 136, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, 0.05) 75%, rgba(0, 255, 136, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gray-900">
        <div
          className="h-full bg-gradient-to-r from-neon-green via-green-400 to-neon-green transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50 blur-sm" />
        </div>
      </div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-neon-green rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      <div className="relative z-10 text-center space-y-12">
        <div className="relative">
          <img
            src="/erasebg-transformed.png"
            alt="Artificial Ignorance"
            className="h-32 w-auto mx-auto animate-pulse"
            style={{ animationDuration: '2s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 blur-xl" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-12 bg-neon-green rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
            <div className="text-neon-green text-2xl font-bold tracking-wider animate-pulse">
              INITIALIZING
            </div>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-12 bg-neon-green rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-gray-400 text-sm font-mono">
            Loading AI Systems{dots}
          </div>

          <div className="flex justify-center items-center gap-3 pt-4">
            <div className="text-neon-green text-4xl font-bold font-mono tracking-wider">
              {progress}%
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${progress > 20 ? 'bg-neon-green' : 'bg-gray-700'} animate-pulse`} />
            <span className={progress > 20 ? 'text-neon-green' : ''}>CORE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-neon-green' : 'bg-gray-700'} animate-pulse`} />
            <span className={progress > 50 ? 'text-neon-green' : ''}>NEURAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${progress > 80 ? 'bg-neon-green' : 'bg-gray-700'} animate-pulse`} />
            <span className={progress > 80 ? 'text-neon-green' : ''}>INTERFACE</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-neon-green/30 rounded-full transition-all duration-300"
              style={{
                height: `${Math.sin((progress / 100) * Math.PI * 4 + i * 0.5) * 20 + 30}px`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes grid-move {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(50px) translateX(50px);
          }
        }
      `}</style>
    </div>
  );
}
