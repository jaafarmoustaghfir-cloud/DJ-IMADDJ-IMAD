import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Sparkles, Navigation, Award, Zap } from 'lucide-react';

interface CityData {
  id: string;
  name: string;
  arabicName: string;
  eventsCount: number;
  popularService: string;
  x: number; // SVG coordinates percent x
  y: number; // SVG coordinates percent y
  bgColor: string;
}

const MOROCCAN_CITIES: CityData[] = [
  { id: 'ouled_teima', name: 'Agadir / Ouled Teima', arabicName: 'أكادير / أولاد تايمة', eventsCount: 320, popularService: 'حفلات زفاف كبرى ومؤثرات ضوئية', x: 28, y: 78, bgColor: 'bg-purple-500' },
  { id: 'rabat', name: 'Rabat', arabicName: 'الرباط العاصمة', eventsCount: 180, popularService: 'افتتاحات ومناسبات مؤسساتية دقيقة', x: 48, y: 28, bgColor: 'bg-yellow-500' },
  { id: 'taroudant', name: 'Taroudant', arabicName: 'تارودانت العريقة', eventsCount: 210, popularService: 'أعراس فاخرة ومهرجانات هواء طلق', x: 33, y: 81, bgColor: 'bg-pink-500' },
  { id: 'tangier', name: 'Tangier', arabicName: 'طنجة العالية', eventsCount: 95, popularService: 'حفلات خطوبة وأفراح شاطئية عصرية', x: 53, y: 10, bgColor: 'bg-blue-500' },
  { id: 'fes', name: 'Fes', arabicName: 'فاس العلمية', eventsCount: 110, popularService: 'أفراح تقليدية عريقة ممتازة', x: 58, y: 33, bgColor: 'bg-emerald-500' },
  { id: 'agadir', name: 'Agadir', arabicName: 'أكادير الشاطئ', eventsCount: 65, popularService: 'أعياد ميلاد وحفلات خاصة ممتعة', x: 26, y: 82, bgColor: 'bg-cyan-500' }
];

export const LivePerformanceMap: React.FC = () => {
  const [activeCity, setActiveCity] = useState<CityData | null>(MOROCCAN_CITIES[0]);

  return (
    <section id="coverage" className="py-24 relative overflow-hidden bg-black/55 border-y border-white/5">
      {/* Dynamic gradient aura */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Text Description (5 Columns) */}
          <div className="lg:col-span-5 text-right flex flex-col justify-center order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium text-sm mb-4">
              <Navigation className="w-4 h-4 animate-bounce text-purple-400" />
              تغطية شاملة لجميع ربوع المملكة
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              نحرك مشاعر المدن <span className="bg-gradient-to-l from-yellow-400 to-pink-500 bg-clip-text text-transparent">من الشمال إلى الجنوب</span>
            </h2>

            <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-6">
              مقرنا الأساسي في أكادير / أولاد تايمة ولكننا نتنقل بكافة معداتنا الصوتية والضوئية المتقدمة لجميع المدن والجهات في المغرب لضمان نفس نقاوة الصوت والأجواء الخارقة أينما كنتم.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3 items-start bg-white/5 border border-white/10 p-4 rounded-2xl">
                <Award className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">أطقم جاهزة ومنظمة بالكامل</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">تنقل عبر شاحنات نقل خاصة تضم أفضل أنظمة الليزر والميكروفونات والمؤثرات بضمان سلامة كاملة.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-white/5 border border-white/10 p-4 rounded-2xl">
                <Zap className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">عقود حجز موثقة رسمية</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">نضمن حجز تاريخكم من خلال اتفاقيات وعقود ممضية رسمياً لتفادي أي مشاكل أو مفاجآت.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Interactive Vector Art Map (7 Columns) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full rounded-3xl bg-gradient-to-b from-purple-950/20 to-black p-6 border border-white/10 shadow-2xl flex items-center justify-center">
              
              {/* Background atmospheric grid layout */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.04)_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl" />
              
              {/* Map Illustration wrapper */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Simulated Moroccan Map SVG vector outline */}
                <svg className="w-full h-full max-h-[420px] text-purple-900/20 opacity-40 select-none pb-8" viewBox="0 0 500 400" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 230 40 Q 250 50 310 40 T 360 40 T 390 10 T 450 30 T 420 80 T 360 110 T 330 160 T 300 210 T 260 260 T 210 320 T 150 360 T 80 390 Z" />
                  <path d="M 215 316 L 240 325 M 260 260 L 290 270 M 305 160 L 325 178" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
                </svg>

                {/* City Pulsing Target Circles */}
                {MOROCCAN_CITIES.map((city) => {
                  const isActive = activeCity?.id === city.id;
                  return (
                    <button
                      key={city.id}
                      onClick={() => setActiveCity(city)}
                      id={`city-pin-${city.id}`}
                      className="absolute p-2 cursor-pointer focus:outline-none pointer-events-auto"
                      style={{ 
                        left: `${city.x}%`, 
                        top: `${city.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Dynamic Radar Wave */}
                        <span className={`animate-ping absolute inline-flex h-6 w-6 rounded-full opacity-65 ${city.bgColor}`} />
                        
                        {/* Inner Anchor Point */}
                        <span className={`relative inline-flex rounded-full h-3 w-3 border border-white ${
                          isActive ? 'scale-125 bg-white shadow-lg' : city.bgColor
                        }`} />
                        
                        {/* Static Label Hover Tag on Map */}
                        <span className={`absolute -bottom-7 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-md transition-all ${
                          isActive 
                            ? 'bg-yellow-400 text-black translate-y-[-2px] shadow-md border border-yellow-300' 
                            : 'bg-black/60 text-gray-300 hover:text-white border border-white/5'
                        }`}>
                          {city.arabicName}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* City dynamic overlay dialog displayed floating */}
                <AnimatePresence mode="wait">
                  {activeCity && (
                    <motion.div
                      key={activeCity.id}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 inset-x-4 md:right-auto md:left-4 md:bottom-4 md:max-w-xs bg-[#0f0923]/90 backdrop-blur-md rounded-2xl p-4 border border-purple-500/25 text-right shadow-2xl z-20"
                    >
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <h4 className="font-bold text-white text-sm">
                          {activeCity.arabicName}
                        </h4>
                        <span className="text-[10px] text-purple-300 font-mono mr-auto">
                          {activeCity.name}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center text-gray-400">
                          <span>الخدمة الشائعة بالمنطقة:</span>
                          <span className="text-white text-[11px] font-semibold">{activeCity.popularService}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400">
                          <span>إجمالي الحفلات المستضافة:</span>
                          <span className="text-yellow-400 font-extrabold font-mono text-sm">{activeCity.eventsCount} حفل ناجح</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 text-center border-t border-white/5">
                        <a
                          href={`https://wa.me/212618407049?text=${encodeURIComponent(`السلام ديجي عماد، أريد تفاصيل الحجز بمدينة: ${activeCity.arabicName}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block text-[10px] font-bold text-purple-300 hover:text-white underline cursor-pointer"
                        >
                          اسأل عن حجز بمدينتك الآن ←
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
