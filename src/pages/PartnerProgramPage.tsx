import { useState } from 'react';
import { usePageTitle } from '../utils/usePageTitle';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import {
  TrendingUp,
  Rocket,
  DollarSign,
  Users,
  Zap,
  Award,
  Target,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
  Clock,
  Settings,
  MessageSquare,
  Gift,
  Headphones
} from 'lucide-react';

export default function PartnerProgramPage() {
  usePageTitle('Partner Program - Resell White-Label AI');

  const scrollToForm = () => {
    const formElement = document.getElementById('partner-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Hero Section */}
          <section className="text-center mb-32">
            <div className="inline-block mb-6 px-6 py-2 bg-neon-green/10 border border-neon-green rounded-full">
              <span className="text-neon-green font-semibold text-sm">Earn 70% Margins on Recurring Revenue</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Revolutionize Your Agency:<br />
              <span className="text-neon-green">Resell White-Label AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Voice Agents & Automations - No Tech Build Required
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Powered by GoHighLevel, ElevenLabs, ChatGPT & N8N
            </p>

            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-neon-green to-green-400 text-black font-bold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Become a Partner Today
              <ArrowRight className="w-6 h-6" />
            </button>

            <div className="mt-16 relative">
              <img
                src="/artificial_ignorance_-_reseller.png"
                alt="White-Label AI Reseller Program"
                className="w-full max-w-5xl mx-auto rounded-2xl border-2 border-neon-green shadow-[0_0_50px_rgba(0,255,0,0.3)]"
              />
            </div>
          </section>

          {/* Market Opportunity Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                The <span className="text-neon-green">$200B AI Automation Market</span> is Exploding
              </h2>
              <p className="text-xl text-gray-400">Are You In?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">80% of businesses want AI engagement</h3>
                    <p className="text-gray-400">Massive market demand for AI solutions</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Custom AI is costly & slow</h3>
                    <p className="text-gray-400">Building from scratch takes weeks and costs thousands</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">White-label AI = fast, high margins</h3>
                    <p className="text-gray-400">Deploy in days, not months, with premium profit margins</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-12 text-center shadow-[0_0_50px_rgba(0,255,0,0.2)]">
                  <div className="mb-6">
                    <BarChart3 className="w-24 h-24 text-neon-green mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Market Growth</h3>
                  <div className="text-6xl font-bold text-neon-green mb-4">$407B</div>
                  <p className="text-xl text-gray-300">AI market projected by 2027</p>
                  <p className="text-sm text-gray-500 mt-4">*stats sourced from Gartner/Statista</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-neon-green text-black rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center gap-4">
                <Users className="w-8 h-8" />
                <p className="text-2xl font-bold">Clients demand 24/7 AI agents – deliver without the hassle</p>
              </div>
            </div>
          </section>

          {/* Pain Points Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Most Agencies <span className="text-neon-green">Miss Out on AI Revenue</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                  <div className="w-16 h-16 rounded-lg bg-neon-green/10 border border-neon-green flex items-center justify-center mb-6">
                    <Settings className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Slow to scale</h3>
                  <p className="text-gray-400 text-lg">Custom builds take weeks, cost thousands</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                  <div className="w-16 h-16 rounded-lg bg-neon-green/10 border border-neon-green flex items-center justify-center mb-6">
                    <DollarSign className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Low margins</h3>
                  <p className="text-gray-400 text-lg">In-house tech drains resources</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                  <div className="w-16 h-16 rounded-lg bg-neon-green/10 border border-neon-green flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Competition heating up</h3>
                  <p className="text-gray-400 text-lg">Clients flock to AI-first agencies</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-12">
                <div className="text-8xl mb-8">😓</div>
                <blockquote className="text-2xl font-bold mb-6 leading-relaxed">
                  "I Lost 3 clients because I couldn't offer AI voice fast enough"
                </blockquote>
                <p className="text-xl text-neon-green">Anonymous Agency Owner</p>
              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-neon-green">White-Label AI Voice &</span><br />
                Automation Suite
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-8">
                  <div className="bg-gray-900 border-2 border-neon-green rounded-xl p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-lg bg-neon-green/10 border border-neon-green flex items-center justify-center flex-shrink-0">
                        <Zap className="w-8 h-8 text-neon-green" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-neon-green">Plug-and-play</h3>
                        <p className="text-gray-300 text-lg">Voice agents (ElevenLabs-powered), multi-channel automations (email/WhatsApp/SMS)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 border-2 border-neon-green rounded-xl p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-lg bg-neon-green/10 border border-neon-green flex items-center justify-center flex-shrink-0">
                        <Award className="w-8 h-8 text-neon-green" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-neon-green">Built on GoHighLevel</h3>
                        <p className="text-gray-300 text-lg">Custom client dashboards, easy white-labelling</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 border-2 border-neon-green rounded-xl p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-lg bg-neon-green/10 border border-neon-green flex items-center justify-center flex-shrink-0">
                        <Users className="w-8 h-8 text-neon-green" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-neon-green">No Coding</h3>
                        <p className="text-gray-300 text-lg">We handle setup with N8N/ChatGPT integrations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-neon-green/20 blur-3xl"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-12">
                    <Play className="w-32 h-32 text-neon-green mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-neon-green mb-4">Ready to resell in days,</h3>
                    <p className="text-2xl text-white">not months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-neon-green to-green-400 text-black font-bold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300 transform hover:scale-105"
              >
                Start Reselling AI Today
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </section>

          {/* Partnership Model Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-neon-green">Simple, Profitable</span> Partnership
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-neon-green text-black flex items-center justify-center text-3xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Agency</h3>
                <div className="text-left space-y-3">
                  <p className="text-gray-300"><strong>Step 1:</strong> Join for free - Get access to our GHL snapshots/templates</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-neon-green text-black flex items-center justify-center text-3xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Client</h3>
                <div className="text-left space-y-3">
                  <p className="text-gray-300"><strong>Step 2:</strong> Resell to your clients (white-labeled under your brand)</p>
                  <p className="text-gray-300"><strong>Step 3:</strong> Charge $497-$2,997/month per client</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-neon-green text-black flex items-center justify-center text-3xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Revenue Split</h3>
                <div className="relative h-40 mb-4">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#1a1a1a" strokeWidth="40"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#00ff00" strokeWidth="40" strokeDasharray="351.86" strokeDashoffset="105.56" transform="rotate(-90 100 100)"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#666" strokeWidth="40" strokeDasharray="351.86" strokeDashoffset="246.3" transform="rotate(162 100 100)"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-neon-green">70%</div>
                      <div className="text-sm text-gray-400">You keep</div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">You keep <span className="text-neon-green font-bold text-2xl">70%</span>, we take <span className="text-gray-400">30%</span></p>
                <p className="text-sm text-gray-500 mt-2">(billed automatically)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <DollarSign className="w-12 h-12 text-neon-green flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-neon-green">Optional</h3>
                    <p className="text-gray-300">One-time setup fee ($997-$1,997) for custom tweaks</p>
                  </div>
                </div>
              </div>

              <div className="bg-neon-green text-black rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <Gift className="w-12 h-12 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Bonus</h3>
                    <p className="font-semibold">"We provide fulfillment – you focus on sales"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Revenue Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Unlock <span className="text-neon-green">70%+ Gross Margins</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-neon-green" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-neon-green">Example</h3>
                    </div>
                  </div>
                  <p className="text-xl text-gray-300 mb-2">Sell at <span className="text-white font-bold">$997/month</span></p>
                  <p className="text-2xl font-bold text-neon-green">Your take: $698/month</p>
                  <p className="text-sm text-gray-500 mt-2">(after our 30%)</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <Zap className="w-8 h-8 text-neon-green flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-neon-green">Low costs</h3>
                      <p className="text-gray-300">Minimal overhead (we manage tech/updates)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <TrendingUp className="w-8 h-8 text-neon-green flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-neon-green">Scale fast</h3>
                      <p className="text-gray-300">Add-ons like premium voices = easy upsells</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-12">
                <BarChart3 className="w-20 h-20 text-neon-green mx-auto mb-8" />
                <h3 className="text-3xl font-bold text-center mb-8">Stat:</h3>
                <p className="text-2xl font-bold text-center text-neon-green mb-4">
                  "Agencies hit $10K-$50K extra MRR in months"
                </p>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-neon-green">Real Results</span> That Sell Themselves
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-neon-green text-center">For Agencies</h3>
                <div className="space-y-4 text-center">
                  <p className="text-lg text-gray-300">3 clients = <span className="text-white font-bold">Recoup setup in weeks</span></p>
                  <p className="text-3xl font-bold text-neon-green">$14K/month</p>
                  <p className="text-gray-400">profit with 20 clients</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-neon-green text-center">For Clients</h3>
                <div className="space-y-4 text-center">
                  <p className="text-3xl font-bold text-neon-green">40%</p>
                  <p className="text-lg text-gray-300">more bookings</p>
                  <p className="text-3xl font-bold text-neon-green mt-4">$120K</p>
                  <p className="text-gray-400">annual staffing savings</p>
                  <p className="text-sm text-gray-500">(e.g., dental/real estate niches)</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-neon-green text-center">Case Study</h3>
                <div className="space-y-4 text-center">
                  <p className="text-lg text-gray-300">Agency A added</p>
                  <p className="text-4xl font-bold text-neon-green">$30K/month</p>
                  <p className="text-gray-400">revenue in 9 months reselling similar AI bundles</p>
                </div>
              </div>
            </div>

            <div className="bg-neon-green text-black rounded-2xl p-8 text-center">
              <p className="text-2xl font-bold">Proof: "Clients see 544% ROI on automations – easy close for you"</p>
            </div>
          </section>

          {/* Resources Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Everything You Need to <span className="text-neon-green">Launch & Scale</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-neon-green">Assets</h3>
                <p className="text-gray-400">Co-branded sales decks, demo dashboards, email templates, ROI calculators</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-neon-green">Training</h3>
                <p className="text-gray-400">Onboarding calls, video tutorials, private partner community</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-neon-green">Incentives</h3>
                <p className="text-gray-400">50% bonus on first sales; $500 referral rewards</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-neon-green/10 border border-neon-green flex items-center justify-center mx-auto mb-6">
                  <Headphones className="w-10 h-10 text-neon-green" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-neon-green">Ongoing</h3>
                <p className="text-gray-400">Free updates, priority support, co-marketing webinars</p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-neon-green/10 to-green-500/10 border-2 border-neon-green rounded-2xl p-8 text-center">
              <p className="text-2xl font-bold text-neon-green">Promise: "We handle the heavy lifting – you collect the checks"</p>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ideal for <span className="text-neon-green">Digital, Marketing & Niche Agencies</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-xl p-8">
                <Target className="w-12 h-12 text-neon-green mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Target</h3>
                <p className="text-gray-300">GHL users, real estate/e-com specialists, SMB consultants</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-xl p-8">
                <Star className="w-12 h-12 text-neon-green mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Success</h3>
                <blockquote className="text-lg italic text-gray-300 mb-2">
                  "Solo agency hit $12K/month with zero staff"
                </blockquote>
                <p className="text-sm text-gray-500">– Partner Testimonial</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-xl p-8">
                <CheckCircle2 className="w-12 h-12 text-neon-green mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Another Win</h3>
                <p className="text-gray-300">Consolidated tools, boosted retention by <span className="text-neon-green font-bold">40%</span></p>
              </div>
            </div>

            <div className="mt-12 bg-neon-green text-black rounded-2xl p-8 text-center">
              <p className="text-2xl font-bold">Join 50+ agencies already scaling with us</p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Add <span className="text-neon-green">AI Revenue Streams?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-neon-green text-black flex items-center justify-center text-4xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Step 1</h3>
                <p className="text-xl text-gray-300">Book a 15-min demo call</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-neon-green text-black flex items-center justify-center text-4xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Step 2</h3>
                <p className="text-xl text-gray-300">Get your free pilot snapshot & assets</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-neon-green text-black flex items-center justify-center text-4xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-2xl font-bold mb-4 text-neon-green">Step 3</h3>
                <p className="text-xl text-gray-300">Launch & earn - Start reselling in 1 week</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-2xl p-8 text-center mb-12">
              <p className="text-2xl font-bold text-red-400">Urgency: "Limited spots for Q1 2026 partners – Apply now!"</p>
            </div>

            <div className="text-center">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-neon-green to-green-400 text-black font-bold text-xl rounded-lg hover:shadow-[0_0_40px_rgba(0,255,0,0.6)] transition-all duration-300 transform hover:scale-105"
              >
                Apply to Become a Partner
                <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </section>

          {/* Partner Form */}
          <section id="partner-form" className="mb-32">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-neon-green rounded-2xl p-12 shadow-[0_0_50px_rgba(0,255,0,0.3)]">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">
                    <span className="text-neon-green">Become a Partner</span>
                  </h2>
                  <p className="text-xl text-gray-400">Fill out the form below and we'll be in touch within 24 hours</p>
                </div>

                <PartnerForm />
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}

function PartnerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    clients: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-ghl-contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            ...formData,
            tags: ['partner-program', 'reseller-inquiry']
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-neon-green/10 border-2 border-neon-green flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-neon-green" />
        </div>
        <h3 className="text-3xl font-bold mb-4 text-neon-green">Application Received!</h3>
        <p className="text-xl text-gray-300 mb-2">Thank you for your interest in our partner program.</p>
        <p className="text-gray-400">Our team will review your application and contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">First Name *</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">Last Name *</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">Email *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">Phone *</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">Company Name *</label>
        <input
          type="text"
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">Website</label>
        <input
          type="text"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none text-white"
          placeholder="example.com or https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">Number of Active Clients *</label>
        <select
          required
          value={formData.clients}
          onChange={(e) => setFormData({ ...formData, clients: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none text-white"
        >
          <option value="">Select...</option>
          <option value="1-5">1-5 clients</option>
          <option value="6-10">6-10 clients</option>
          <option value="11-25">11-25 clients</option>
          <option value="26-50">26-50 clients</option>
          <option value="51+">51+ clients</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">Tell us about your agency and why you're interested *</label>
        <textarea
          required
          rows={4}
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-neon-green focus:outline-none text-white resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-gradient-to-r from-neon-green to-green-400 text-black font-bold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
