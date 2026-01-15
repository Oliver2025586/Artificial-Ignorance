import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, ArrowRight } from 'lucide-react';
import { createGHLContact } from '../utils/gohighlevel';

interface DemoPopupProps {
  onClose: () => void;
}

export default function DemoPopup({ onClose }: DemoPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createGHLContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        source: 'Demo Popup',
      });

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSuccess) {
    return createPortal(
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="relative bg-black border-2 border-neon-green rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,255,0,0.3)] text-center">
          <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-300">We'll contact you shortly to schedule your free demo.</p>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-black border-2 border-neon-green rounded-2xl p-6 max-w-2xl w-full shadow-[0_0_50px_rgba(0,255,0,0.3)] animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-neon-green transition-colors"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-neon-green" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Book Your Free Demo
          </h2>
          <p className="text-gray-300 text-sm">
            See how AI voice agents can transform your business in just 15 minutes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-black border-2 border-white rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-black border-2 border-white rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-white text-sm font-medium mb-1.5">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-black border-2 border-white rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white text-sm font-medium mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-black border-2 border-white rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-neon-green text-black font-bold py-3 rounded-lg hover:bg-neon-green/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Booking...'
            ) : (
              <>
                Book Free Demo
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-gray-400 text-xs text-center">
            No credit card required. Cancel anytime.
          </p>
        </form>
      </div>
    </div>,
    document.body
  );
}
