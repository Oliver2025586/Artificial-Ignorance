import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section id="cta" className="py-24 px-6 sm:px-8 lg:px-12 bg-black relative overflow-hidden border-t-2 border-neon-green">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Grow <span className="text-neon-green">Without the Growing Pains?</span>
        </h2>

        <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
          Serve more customers. Close more deals. Scale your business—all without the complexity, hiring, or headaches.
        </p>

        <Link to="/signup" className="clean-button-primary-inverted group px-10 py-4 text-lg font-semibold inline-flex items-center gap-2 transition-all duration-200">
          Book a Free Demo
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </Link>

        <p className="text-white text-sm mt-8">
          No contracts. Cancel anytime. Start free.
        </p>
      </div>
    </section>
  );
}
