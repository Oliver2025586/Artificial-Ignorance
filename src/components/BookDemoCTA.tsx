import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BookDemoCTA() {

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-black relative overflow-hidden border-y-2 border-neon-green">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_50%)]"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-black border-2 border-neon-green rounded-full px-4 py-2 mb-6">
          <Calendar size={16} className="text-neon-green" />
          <span className="text-sm font-medium text-neon-green">Free Consultation Available</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Not Sure This Works for <span className="text-neon-green">You?</span>
        </h2>

        <p className="text-lg sm:text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
          Let us show you. Book a free demo and watch AI handle real calls, book appointments, and close deals—live.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="clean-button-primary-inverted group px-10 py-4 text-lg font-semibold inline-flex items-center gap-2 transition-all duration-200"
          >
            See How It Works
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>

          <Link to="/pricing" className="px-10 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200">
            See Plans & Pricing
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-neon-green text-2xl font-bold mb-1">15 min</p>
            <p className="text-white text-sm">Quick Setup</p>
          </div>
          <div className="text-center">
            <p className="text-neon-green text-2xl font-bold mb-1">24/7</p>
            <p className="text-white text-sm">AI Availability</p>
          </div>
          <div className="text-center">
            <p className="text-neon-green text-2xl font-bold mb-1">No Code</p>
            <p className="text-white text-sm">Easy Integration</p>
          </div>
        </div>
      </div>
    </section>
  );
}
