import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Cake, Tv, Flame, Music, Shield, Zap, ChevronDown, Check } from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { ServiceItem } from '../types';

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  Heart,
  Cake,
  Tv,
  Flame,
  Music,
  Shield,
  Zap,
};

export const Services: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleDetail = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background abstract neon lights for atmosphere */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium text-sm mb-4">
              خدمات حصرية واحترافية
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-white to-purple-400 bg-clip-text text-transparent mb-5 leading-tight">
              خدماتنا التنشيطية والموسيقية
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
              يقدم ديجي عماد باقة من أفخر الخدمات الموسيقية والتنشيطية لضمان تفجير حماس حفلتكم وجعلها ليلة خالدة في الأذهان.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Music;
            const isOpen = activeId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col h-full rounded-2xl glass-panel border ${service.borderColor} p-6 overflow-hidden transition-all duration-300 group`}
                style={{
                  boxShadow: isOpen 
                    ? `0 10px 40px -10px ${service.glowColor}` 
                    : 'none'
                }}
              >
                {/* Visual ambient light flare background on hover */}
                <div 
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: service.glowColor }}
                />

                {/* Service Tag */}
                <span className="absolute top-4 left-4 inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-yellow-400/90 border border-yellow-500/20 backdrop-blur-md">
                  {service.tag}
                </span>

                {/* Icon Circle */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10"
                  style={{ 
                    background: `linear-gradient(135deg, rgba(255,255,255,0.05), ${service.glowColor.replace('0.35', '0.1')})`,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <IconComponent className="w-6 h-6 text-yellow-400 group-hover:text-purple-300 transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
                  {service.arabicTitle}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow font-light">
                  {service.description}
                </p>

                {/* Action details toggle with Lucide Chevron */}
                <button
                  onClick={() => toggleDetail(service.id)}
                  id={`btn-service-${service.id}`}
                  className="flex items-center justify-between w-full text-xs font-semibold text-purple-300 group-hover:text-white transition-colors duration-300 border-t border-white/5 pt-4 mt-auto focus:outline-none cursor-pointer"
                >
                  <span>{isOpen ? 'إخفاء التفاصيل' : 'عرض برنامج الحفل'}</span>
                  <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-yellow-400' : ''}`} />
                </button>

                {/* Subdetails Expand Area using Framer Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`details-service-${service.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden mt-4 bg-black/30 rounded-lg p-3 border border-white/5"
                    >
                      <ul className="space-y-2 text-xs text-gray-300 text-right">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <Check className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 pt-3 border-t border-white/5 flex justify-center">
                        <a 
                          href={`https://wa.me/212618407049?text=${encodeURIComponent(`سلام ديجي عماد، أريد الاستفسار وحجز خدمة: ${service.arabicTitle}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] font-bold py-1.5 px-3 rounded bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 transition-all cursor-pointer"
                        >
                          استفسر عبر واتساب
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

        {/* Services CTA block */}
        <div className="mt-16 text-center max-w-xl mx-auto glass-panel border border-white/5 rounded-2xl p-6 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping mr-1 ml-2" />
          <p className="text-gray-300 text-sm font-medium inline-block mb-4">ديجي عماد متواجد الآن للتشاور بخصوص الخدمات والأسعار</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`https://wa.me/212618407049?text=${encodeURIComponent("السلام عليكم DJ IMAD 🎉\nأرغب في حجز موعد لمناسبة خاصة، المرجو التواصل معي.")}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-extrabold text-xs transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-yellow-500/10 cursor-pointer pointer-events-auto"
            >
              اطلب عرض السعر
            </a>
            <a 
              href={`https://wa.me/212618407049?text=${encodeURIComponent("السلام عليكم DJ IMAD 🎉\nأرغب في حجز موعد لمناسبة خاصة، المرجو التواصل معي.")}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-8 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-300 border border-green-500/30 font-extrabold text-xs transition-all shadow-lg shadow-emerald-950/10 cursor-pointer pointer-events-auto"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
