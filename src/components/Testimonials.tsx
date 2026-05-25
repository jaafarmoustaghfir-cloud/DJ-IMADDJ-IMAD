import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const autoplayRef = useRef<any>(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 7000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleNext = () => {
    stopAutoplay();
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    startAutoplay();
  };

  const handlePrev = () => {
    stopAutoplay();
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    startAutoplay();
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-gradient-to-t from-black via-[#0c081c]/50 to-black/30 border-t border-white/5">
      {/* Dynamic neon circles in the background */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 font-medium text-sm mb-4">
            شهادات زبنائنا الكرام
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            قصص فرح وسعادة <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">بشهادة العرسان</span>
          </h2>
          <p className="text-gray-400 font-light text-base">
            ثقة زبنائنا هي وقود استمراريتنا، وكلماتهم الطيبة هي شرف نفتخر به في كل مدينة مغربية نزورها.
          </p>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative">
          
          {/* Quote Graphic Icon Decors */}
          <div className="absolute -top-12 -right-6 text-purple-500/10 pointer-events-none select-none">
            <Quote className="w-24 h-24 rotate-180" />
          </div>
          <div className="absolute -bottom-10 -left-6 text-purple-500/10 pointer-events-none select-none">
            <Quote className="w-24 h-24" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="glass-panel border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 text-center"
            >
              {/* Stars Rating Array */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5.5 h-5.5 text-yellow-500 fill-current animate-pulse" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-white text-base md:text-2xl font-light leading-relaxed mb-8 italic">
                ” {current.review} ”
              </p>

              {/* Reviewer Meta Details */}
              <div className="border-t border-white/5 pt-6 flex flex-col items-center">
                <h4 className="text-lg md:text-xl font-bold text-yellow-400">
                  {current.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                  <span className="font-semibold px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
                    {current.eventType}
                  </span>
                  <span>•</span>
                  <span>{current.location}</span>
                  <span>•</span>
                  <span>{current.date}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Slider Left and Right Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              id="testimonial-prev"
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all pointer-events-auto cursor-pointer"
              title="السابق"
            >
              <ChevronRight className="w-5 h-5" /> {/* Right chevron is "Prev" in RTL context */}
            </button>
            
            {/* Slide Bullets Indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    stopAutoplay();
                    setActiveIndex(idx);
                    startAutoplay();
                  }}
                  id={`testimonial-bullet-${idx}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${
                    activeIndex === idx ? 'w-8 bg-yellow-400' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              id="testimonial-next"
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all pointer-events-auto cursor-pointer"
              title="التالي"
            >
              <ChevronLeft className="w-5 h-5" /> {/* Left chevron is "Next" in RTL context */}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
