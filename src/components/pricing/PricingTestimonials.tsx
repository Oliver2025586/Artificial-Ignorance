import { Star } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    content: 'The AI voices are incredibly natural. Our customer satisfaction has increased by 40% since implementing this solution.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director',
    content: 'Scalable, reliable, and cost-effective. We handle 10x more calls without increasing our team size.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    content: 'The custom voice options and integrations are fantastic. Setup was quick and support has been excellent.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
  }
];

export default function PricingTestimonials() {
  const scrollRef = useScrollAnimation();

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Loved by <span className="text-neon-green">Thousands</span>
          </h2>
          <p className="text-gray-400 text-lg">
            See what our customers have to say
          </p>
        </div>

        <div
          ref={scrollRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-neon-green/50 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-neon-green text-neon-green" />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
