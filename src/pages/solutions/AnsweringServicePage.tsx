import { PhoneIncoming, Bell, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import AnimatedBackground from '../../components/AnimatedBackground';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export default function AnsweringServicePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-green/10 mb-6">
                <PhoneIncoming className="w-10 h-10 text-neon-green" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Answering <span className="text-neon-green">Service</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Never miss a call with AI-powered answering services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-xl p-8 hover:border-neon-green transition-all">
                <Bell className="w-12 h-12 text-neon-green mb-4" />
                <h3 className="text-2xl font-bold mb-3">Zero Missed Calls</h3>
                <p className="text-gray-400">Every call is answered instantly, every time</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-xl p-8 hover:border-neon-green transition-all">
                <Shield className="w-12 h-12 text-neon-green mb-4" />
                <h3 className="text-2xl font-bold mb-3">Professional Service</h3>
                <p className="text-gray-400">Consistent, professional responses for every caller</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-xl p-8 hover:border-neon-green transition-all">
                <PhoneIncoming className="w-12 h-12 text-neon-green mb-4" />
                <h3 className="text-2xl font-bold mb-3">Instant Response</h3>
                <p className="text-gray-400">No hold times, no busy signals, just answers</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-2 border-neon-green rounded-2xl p-12 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Custom greeting and call scripts',
                  'Message taking and transcription',
                  'Urgent call escalation',
                  'Call filtering and spam detection',
                  'Multiple number support',
                  'Detailed call logs and recordings'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-neon-green flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Answer Every Call?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Start capturing every opportunity with AI answering services
              </p>
              <Link to="/signup" className="clean-button-primary px-8 py-3 text-lg inline-flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
