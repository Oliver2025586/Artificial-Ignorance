import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "The AI sounds completely human. Our customer engagement jumped 300% after we went live.",
    author: "Sarah Chen",
    role: "VP of Operations, TechFlow Inc",
    avatar: "SC"
  },
  {
    quote: "What used to take us days now happens in seconds. The quality is better too. Total game-changer.",
    author: "Marcus Rodriguez",
    role: "Founder, AutoScale Solutions",
    avatar: "MR"
  }
];

export default function SocialProof() {
  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 bg-white border-y-2 border-neon-green">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            Real People. <span className="text-neon-green">Real Results.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="clean-card p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-neon-green text-neon-green" />
                ))}
              </div>

              <p className="text-black text-base mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black border-2 border-neon-green flex items-center justify-center">
                  <span className="text-sm font-semibold text-neon-green">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="text-black font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-black text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
