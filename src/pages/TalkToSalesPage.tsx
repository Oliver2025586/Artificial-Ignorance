import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Users, Clock, TrendingDown, ArrowRight, CheckCircle } from 'lucide-react';
import { usePageTitle } from '../utils/usePageTitle';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { createGHLContact } from '../utils/gohighlevel';

export default function TalkToSalesPage() {
  usePageTitle('Talk to Sales — Artificial Ignorance');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    monthlyCallVolume: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('funnel_leads')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          monthly_call_volume: formData.monthlyCallVolume,
          message: formData.message,
          source: 'talk_to_sales_page'
        }]);

      if (error) throw error;

      await createGHLContact({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        source: 'Talk to Sales Page'
      });

      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        monthlyCallVolume: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatedBackground />

      <div className="relative z-10">
        <section className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  See Artificial Ignorance in <span className="text-[#00ff00]">Action</span>
                </h1>
                <p className="text-xl text-white mb-8">
                  Join 100+ enterprise teams powering over 5M+ monthly voice calls across 30+ countries.
                  Discover how our AI voice agents can transform your operations.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00ff00] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Instant Setup</p>
                      <p className="text-gray-400">Get your AI voice agent running in minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00ff00] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Enterprise-Grade Security</p>
                      <p className="text-gray-400">SOC2, GDPR, and HIPAA compliant</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00ff00] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">24/7 Support</p>
                      <p className="text-gray-400">Dedicated success team for enterprise customers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00ff00] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Seamless Integrations</p>
                      <p className="text-gray-400">Connect with all your existing tools and platforms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00ff00] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Custom Voice Training</p>
                      <p className="text-gray-400">Tailor AI responses to match your brand voice</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00ff00] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Real-Time Analytics</p>
                      <p className="text-gray-400">Track performance and optimize conversions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#00ff00] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Scalable Infrastructure</p>
                      <p className="text-gray-400">Handle unlimited calls without performance issues</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                {submitSuccess ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-[#00ff00] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-white">Our team will reach out to you shortly.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-white">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff00] transition-all text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff00] transition-all text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2 text-white">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff00] transition-all text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff00] transition-all text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="monthlyCallVolume" className="block text-sm font-medium mb-2 text-white">
                          Monthly Call Volume
                        </label>
                        <select
                          id="monthlyCallVolume"
                          name="monthlyCallVolume"
                          value={formData.monthlyCallVolume}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff00] transition-all text-white"
                        >
                          <option value="" className="bg-black">Select volume</option>
                          <option value="<1000" className="bg-black">Less than 1,000</option>
                          <option value="1000-5000" className="bg-black">1,000 - 5,000</option>
                          <option value="5000-20000" className="bg-black">5,000 - 20,000</option>
                          <option value="20000+" className="bg-black">20,000+</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                          Tell us about your needs
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff00] transition-all resize-none text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#00ff00] text-black font-semibold py-4 rounded-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? 'Submitting...' : 'Contact Sales'}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Phone className="w-12 h-12 text-[#00ff00]" />
                </div>
                <div className="text-4xl font-bold text-[#00ff00] mb-2">45M+</div>
                <div className="text-white">Customer Calls</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-12 h-12 text-[#00ff00]" />
                </div>
                <div className="text-4xl font-bold text-[#00ff00] mb-2">5M+</div>
                <div className="text-white">Hours Saved</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <TrendingDown className="w-12 h-12 text-[#00ff00]" />
                </div>
                <div className="text-4xl font-bold text-[#00ff00] mb-2">90%</div>
                <div className="text-white">Cost Reduction</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-12 h-12 text-[#00ff00]" />
                </div>
                <div className="text-4xl font-bold text-[#00ff00] mb-2">35%</div>
                <div className="text-white">More Calls Answered</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                High-Performing Teams Love Artificial Ignorance
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                Enterprise teams that use Artificial Ignorance see viral adoption of the product and say they "can't imagine life without it"
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#00ff00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white mb-6">
                  "Artificial Ignorance has completely transformed how we handle customer inquiries. The AI is incredibly natural and our response times have improved dramatically."
                </p>
                <div>
                  <p className="font-semibold text-white">Sarah Johnson</p>
                  <p className="text-sm text-gray-400">VP of Operations, TechCorp</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#00ff00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white mb-6">
                  "We've reduced our support costs by 90% while actually improving customer satisfaction. It's been a game-changer for our business."
                </p>
                <div>
                  <p className="font-semibold text-white">Michael Chen</p>
                  <p className="text-sm text-gray-400">CEO, Growth Ventures</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#00ff00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white mb-6">
                  "The setup was incredibly easy and the results were immediate. Our team can't imagine going back to the old way of handling calls."
                </p>
                <div>
                  <p className="font-semibold text-white">Emily Rodriguez</p>
                  <p className="text-sm text-gray-400">Director of Customer Success, Scale Inc</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl text-white">
                Join 100+ enterprise teams across 30+ countries
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
              <div className="text-2xl font-bold text-white">Company A</div>
              <div className="text-2xl font-bold text-white">Company B</div>
              <div className="text-2xl font-bold text-white">Company C</div>
              <div className="text-2xl font-bold text-white">Company D</div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#00ff00]/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Voice Operations?
            </h2>
            <p className="text-xl text-white mb-8">
              Schedule a personalized demo and see how Artificial Ignorance can help your team handle more calls, save time, and reduce costs.
            </p>
            <Link
              to="/talk-to-sales"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#00ff00] text-black font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-all"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
