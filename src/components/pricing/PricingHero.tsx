import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PricingHero() {
  const [minutes, setMinutes] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);

  const calculatePrice = (mins: number) => {
    if (mins <= 1000) return 49;
    if (mins <= 2500) return 99;
    if (mins <= 5000) return 199;
    if (mins <= 10000) return 349;
    return 599;
  };

  const getTierName = (mins: number) => {
    if (mins <= 1000) return 'Starter';
    if (mins <= 2500) return 'Professional';
    if (mins <= 5000) return 'Growth';
    if (mins <= 10000) return 'Agency';
    return 'Enterprise';
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(Number(e.target.value));
  };

  const price = calculatePrice(minutes);
  const tierName = getTierName(minutes);
  const pricePerMinute = (price / minutes).toFixed(3);

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.05),transparent_50%)]"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
          Simple, Transparent <span className="text-neon-green">Pricing</span>
        </h1>

        <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
          Scale your AI voice operations with flexible plans designed for businesses of all sizes
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green/30 rounded-3xl p-10 sm:p-16 max-w-6xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,0,0.08),transparent_50%)]"></div>

          <div className="relative z-10">
            <div className="mb-12">
              <div className="flex items-baseline justify-center gap-3 mb-3">
                <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-white">£{price}</span>
                <span className="text-2xl text-gray-400">/mo</span>
              </div>
              <p className="text-neon-green font-bold text-2xl mb-2">{tierName} Plan</p>
              <p className="text-base text-gray-400">£{pricePerMinute} per minute</p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-medium text-gray-400">Monthly Minutes</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    {minutes >= 10000 ? '∞' : minutes.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm">min</span>
                </div>
              </div>

              <div className="relative py-10 px-1">
                <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-2 bg-gray-800/60 rounded-full shadow-inner"></div>

                <div
                  className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${(minutes / 10000) * 100}%`,
                    background: 'linear-gradient(90deg, rgba(0,255,0,0.6) 0%, rgba(0,255,0,1) 100%)',
                    boxShadow: '0 0 12px rgba(0,255,0,0.4)'
                  }}
                ></div>

                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={minutes}
                  onChange={handleSliderChange}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  className="pricing-slider w-full relative z-10 cursor-grab active:cursor-grabbing"
                />

                <div
                  className={`absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ${
                    isDragging ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    left: `calc(${(minutes / 10000) * 100}%)`
                  }}
                >
                  <div className="relative -translate-x-1/2">
                    <div
                      className="w-6 h-6 bg-white rounded-full border-3 border-neon-green shadow-lg"
                      style={{
                        boxShadow: isDragging
                          ? '0 0 0 4px rgba(0,255,0,0.2), 0 4px 12px rgba(0,0,0,0.3)'
                          : '0 0 0 2px rgba(0,255,0,0.15), 0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    ></div>
                    <div className="absolute inset-1 bg-neon-green rounded-full opacity-80"></div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-8 px-1">
                  <span className={minutes <= 300 ? 'text-neon-green font-medium' : ''}>100</span>
                  <span className={minutes > 1800 && minutes <= 3200 ? 'text-neon-green font-medium' : ''}>2.5K</span>
                  <span className={minutes > 4200 && minutes <= 5800 ? 'text-neon-green font-medium' : ''}>5K</span>
                  <span className={minutes > 6800 && minutes <= 8200 ? 'text-neon-green font-medium' : ''}>7.5K</span>
                  <span className={minutes >= 9800 ? 'text-neon-green font-medium' : ''}>10K+</span>
                </div>
              </div>
            </div>

            <Link to="/signup" className="block w-full clean-button-primary py-5 text-xl font-bold text-center">
              Get Started
            </Link>

            <p className="text-sm text-gray-400 mt-6 text-center">
              30-Day Rolling Contracts • No Long Term Commitments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
