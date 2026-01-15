import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface TestimonialVideo {
  id: string;
  videoId: string;
  name: string;
  company: string;
  title: string;
}

const testimonialVideos: TestimonialVideo[] = [
  {
    id: '1',
    videoId: '1uw0EWN1yvldLDTfMhD6JsW8kivWMj9zA',
    name: 'Client Success Story',
    company: 'Verified Business',
    title: 'How we increased sales by 300%'
  },
  {
    id: '2',
    videoId: '1Cy2SGhBhgwphzPlXNDIEnsKqZgmqkFyW',
    name: 'Business Owner',
    company: 'Growing Company',
    title: 'Never miss a lead again'
  },
  {
    id: '3',
    videoId: '15y9BGfGxFfthAn6GE5CO2LPsaD2wOhm2',
    name: 'Sales Director',
    company: 'Enterprise Client',
    title: 'AI transformed our business'
  }
];

export default function TestimonialVideos() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <>
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              See Real <span className="text-neon-green">Results</span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Hear from businesses that transformed their sales with AI voice agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video.videoId)}
                className="group relative bg-black border-2 border-white rounded-xl overflow-hidden hover:border-neon-green hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative aspect-video bg-gradient-to-br from-neon-green/10 to-black flex items-center justify-center">
                  <iframe
                    src={`https://drive.google.com/file/d/${video.videoId}/preview`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    allow="autoplay"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-neon-green font-medium">{video.name}</p>
                  <p className="text-white text-sm">{video.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-16 right-0 text-white hover:text-neon-green transition-colors p-2 bg-black/50 rounded-full"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden border-2 border-neon-green shadow-[0_0_50px_rgba(0,255,0,0.5)]">
              <iframe
                src={`https://drive.google.com/file/d/${selectedVideo}/preview`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay"
                title="Testimonial video"
              ></iframe>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
