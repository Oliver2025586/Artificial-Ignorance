import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingCTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-neon-green/10 via-black to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,255,0,0.15),transparent_60%)]"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0010_1px,transparent_1px),linear-gradient(to_bottom,#00ff0010_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Managing Over <span className="text-neon-green">2 Million Minutes</span> Monthly
        </h2>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of businesses automating their voice operations with AI. Get started today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/signup" className="clean-button-primary px-8 py-4 text-lg font-semibold inline-flex items-center gap-2 group">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link to="/signup" className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200">
            View Demo
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-green"></div>
            <span>30-Day Rolling Contracts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-green"></div>
            <span>No Long Term Commitments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-green"></div>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
