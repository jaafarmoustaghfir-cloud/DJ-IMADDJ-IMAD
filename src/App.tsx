import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  ArrowLeft, 
  Users, 
  Trophy, 
  Award, 
  Calendar, 
  Instagram, 
  Facebook, 
  Play, 
  Star, 
  MapPin, 
  Sparkles, 
  Disc, 
  Music,
  Share2,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

// Import Custom Modular Components
import { Equalizer } from './components/Equalizer';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { TikTokShowcase } from './components/TikTokShowcase';
import { BookingForm } from './components/BookingForm';
import { LivePerformanceMap } from './components/LivePerformanceMap';
import { FAQ } from './components/FAQ';
import { Testimonials } from './components/Testimonials';

// Import Audio Engine
import { AudioSynthEngine } from './utils/audioSynth';
import { STATS_DATA } from './data';

// Instantiate the custom sound synthesizer safely
const synth = new AudioSynthEngine();

// Premium automated WhatsApp link with Arabic configuration
const WHATSAPP_LINK = `https://wa.me/212618407049?text=${encodeURIComponent("السلام عليكم DJ IMAD 🎉\nأرغب في حجز موعد لمناسبة خاصة، المرجو التواصل معي.")}`;

export default function App() {
  // Application-wide UI States
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.15);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showFloatBubble, setShowFloatBubble] = useState<boolean>(true);
  const [chatBubbleClosed, setChatBubbleClosed] = useState<boolean>(false);

  // Dynamic Event Countdown State (recomputes to exactly 5 days, 8 hours ahead on load)
  const [countdown, setCountdown] = useState({ days: 5, hours: 8, minutes: 12, seconds: 45 });

  // References
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState<boolean>(false);
  const [countedStats, setCountedStats] = useState<number[]>(STATS_DATA.map(() => 0));

  // Loading Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Countdown clock intervals
  useEffect(() => {
    // Generate a landing reference date ~5 days ahead
    const targetTime = Date.now() + (5 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000) + (12 * 60 * 1000);
    
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Audio Synth Controls wrapper
  const handleToggleAudio = async () => {
    if (isAudioPlaying) {
      synth.stop();
      setIsAudioPlaying(false);
    } else {
      try {
        await synth.start();
        synth.setVolume(audioVolume);
        setIsAudioPlaying(true);
      } catch (err) {
        console.error('Failed to boot synth:', err);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setAudioVolume(vol);
    synth.setVolume(vol);
  };

  // Stats incremental counters
  useEffect(() => {
    const handleScroll = () => {
      if (!statsSectionRef.current || statsAnimated) return;
      const rect = statsSectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom >= 0;

      if (inView) {
        setStatsAnimated(true);
        // Start animate in sequence
        STATS_DATA.forEach((stat, idx) => {
          let currentVal = 0;
          const target = stat.value;
          const step = Math.ceil(target / 80); // Speed ratio
          const timer = setInterval(() => {
            currentVal += step;
            if (currentVal >= target) {
              currentVal = target;
              clearInterval(timer);
            }
            setCountedStats(prev => {
              const copy = [...prev];
              copy[idx] = currentVal;
              return copy;
            });
          }, 20);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      
      {/* Premium Global Background Image - Immersive Atmosphere */}
      <div className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none">
        <img 
          src="https://i.imgur.com/BKnujUJ.jpeg" 
          alt="DJ Imad Show Ambient Background" 
          className="w-full h-full object-cover object-center scale-105 filter blur-[2px] md:blur-none transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-radial-gradient-to-c from-transparent to-[#050505]/95" />
      </div>

      {/* Background Atmospheric Effects of Immersive UI */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* 1. INITIAL LOADER SCREEN OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Elegant Moroccan star geometry graphic */}
            <div className="relative w-28 h-28 flex items-center justify-center mb-8">
              <span className="absolute inset-0 rounded-full border border-yellow-500/20 animate-pulse-slow" />
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 flex items-center justify-center relative z-10 border border-white/20">
                <img 
                  src="https://i.imgur.com/tHXJKsr.png" 
                  alt="DJ Imad Preloader Logo" 
                  className="w-full h-full object-cover animate-pulse"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute inset-2 rounded-full border border-pink-500/30 animate-spin [animation-duration:15s]" />
            </div>

            <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-300 via-white to-purple-400 bg-clip-text text-transparent mb-3 font-sans tracking-wide">
              DJ IMAD آيت الحسن
            </h1>
            <p className="text-purple-400 font-light text-sm tracking-widest uppercase">
              أفضل خدمات تنشيط الأفراح والمناسبات بالمغرب
            </p>

            {/* Glowing Loading Dots */}
            <div className="flex justify-center gap-1.5 mt-8">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TRANSPARENT GLASS STICKY HEADER / NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-white/5 glass-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo / Branding */}
            <a href="#home" className="flex items-center gap-2 group pointer-events-auto">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md border border-white/10">
                <img 
                  src="https://i.imgur.com/tHXJKsr.png" 
                  alt="DJ IMAD Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-right">
                <span className="block font-black text-white text-base leading-none tracking-wide group-hover:text-yellow-400 transition-colors">
                  DJ IMAD
                </span>
                <span className="block text-[8.5px] font-bold text-yellow-300 tracking-wider">
                  ديجي عماد آيت الحسن
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (RTL Oriented) */}
            <nav className="hidden md:flex items-center gap-1 pointer-events-auto">
              {[
                { href: '#about', label: 'من نحن' },
                { href: '#services', label: 'الخدمات' },
                { href: '#gallery', label: 'معرض الأعمال' },
                { href: '#coverage', label: 'مناطق التغطية' },
                { href: '#booking', label: 'حجز المناسبات' },
                { href: '#faq', label: 'استفسارات' }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveTab(link.href.substring(1))}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    activeTab === link.href.substring(1)
                      ? 'bg-white/10 text-yellow-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action CTA Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-3 pointer-events-auto">
              {/* Premium glowing WhatsApp Booking button */}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-black py-2.5 px-4.5 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-black shadow-lg shadow-emerald-500/20 hover:scale-[1.03] transition-all duration-300 hover:shadow-emerald-500/40 cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>احجز الآن</span>
              </a>

              {/* Dial CTA */}
              <a 
                href="tel:0618407049"
                className="flex items-center gap-1.5 text-[11px] font-bold py-2.5 px-3.5 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <Phone className="w-3 h-3 fill-current" />
                <span>اتصل: 0618407049</span>
              </a>

              {/* Sound synth music controller in header */}
              <button
                onClick={handleToggleAudio}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isAudioPlaying 
                    ? 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400' 
                    : 'border-white/10 bg-white/5 text-gray-300 hover:text-white'
                }`}
                title={isAudioPlaying ? 'كتم الموسيقى الخلفية المباشرة' : 'استمع للحفلة (موسيقى خلفية)'}
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Hamburger menu Button */}
            <div className="flex md:hidden items-center gap-3">
              {/* Quick Synth controller click */}
              <button
                onClick={handleToggleAudio}
                className={`p-2 rounded-full border cursor-pointer ${
                  isAudioPlaying ? 'bg-yellow-400/15 border-yellow-400/30 text-yellow-400' : 'bg-white/5 border-white/10 text-gray-300'
                }`}
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 cursor-pointer"
                id="mobile-menu-trigger"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Header Dropdown slider panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-3xl overflow-hidden"
              id="mobile-navigation-dropdown"
            >
              <div className="px-4 pt-4 pb-6 space-y-3 text-right">
                {[
                  { href: '#about', label: 'من نحن - ديجي عماد' },
                  { href: '#services', label: 'خدمات التنشيط والأعراس' },
                  { href: '#gallery', label: 'معرض الصور والمباشرات' },
                  { href: '#coverage', label: 'مناطق التغطية بالمغرب' },
                  { href: '#booking', label: 'حجز الحفلات والاتفاقيات' },
                  { href: '#faq', label: 'الاستفسارات الشائعة' }
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(link.href.substring(1));
                      setMobileMenuOpen(false);
                    }}
                    className="block px-4 py-3 rounded-xl hover:bg-white/5 text-gray-200 text-sm font-semibold border border-transparent hover:border-white/5"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-extrabold text-xs shadow-md shadow-emerald-950/20"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    تواصل عبر واتساب (الحجز المباشر)
                  </a>
                  <a
                    href="tel:0618407049"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    تواصل هافياً بالمغرب: 0618407049
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SECTION (Dynamic lights, sound synthesizer dashboard panel, physical EQ display) */}
      <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-[#050505]">
        
        {/* Absolute Background Image with dark overlay */}
        <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
          <img 
            src="https://i.imgur.com/BKnujUJ.jpeg" 
            alt="DJ Imad Show Atmosphere" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlay to fade into dark UI elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/80 to-[#050505]" />
        </div>

        {/* Dynamic aurora lights in background */}
        <div className="absolute top-20 left-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow [animation-delay:-4s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right Heading + Buttons segment (7 cols) */}
            <div className="lg:col-span-7 text-right">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-black mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>أفراحكم بلمسة فاخرة وخبرة لا تضاهى</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                  أجواء احترافية <br />
                  <span className="bg-gradient-to-l from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent italic font-serif">
                    لجميع حفلاتكم بالمغرب
                  </span>
                </h1>
                
                <h2 className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-2xl mr-auto">
                  ديجي عماد آيت الحسن يوفر لكم أفخر أجهزة الصوت، هندسة الإضاءة الذكية التفاعلية ومؤثرات الدخان والتبوريدة بأعلى مقاييس الاحترافية.
                </h2>
              </motion.div>

              {/* Direct Buttons Call-to-actions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                {/* "تواصل عبر واتساب" with glowing style */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-8 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-black font-extrabold text-sm transition-all shadow-xl shadow-green-500/25 hover:scale-[1.03] active:scale-95 cursor-pointer pointer-events-auto flex items-center gap-2 animate-pulse"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>تواصل عبر واتساب</span>
                </a>
                
                {/* “احجز حفلتك” */}
                <a
                  href="#booking"
                  className="py-3.5 px-8 rounded-full bg-white/5 border border-white/10 text-white font-extrabold text-sm transition-all hover:bg-white/10 cursor-pointer pointer-events-auto"
                >
                  احجز حفلتك
                </a>

                {/* Instant Dial phone badge */}
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mr-2 border-r border-white/10 pr-4 py-1">
                  <span>للاستفسار السريع:</span>
                  <a href="tel:0618407049" className="text-yellow-400 hover:underline font-mono">0618407049</a>
                </div>
              </motion.div>

              {/* Countdown panel floating in Hero */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-2xl glass-panel border border-purple-500/10 p-4 inline-flex flex-col text-right w-full sm:w-auto max-w-md"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-2">
                  <Clock className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                  <span>العرض المباشر القادم: حفل زفاف فاخر بأولاد تايمة (أكادير)</span>
                </div>
                
                {/* Countdown numbers grid */}
                <div className="flex items-center gap-3 font-mono text-center">
                  {[
                    { label: 'يوم', val: countdown.days },
                    { label: 'ساعة', val: countdown.hours },
                    { label: 'دقيقة', val: countdown.minutes },
                    { label: 'ثانية', val: countdown.seconds }
                  ].map((unit, i) => (
                    <div key={i} className="flex flex-col items-center bg-black/40 rounded-lg p-2 min-w-14 border border-white/5">
                      <span className="text-yellow-400 font-extrabold text-base md:text-lg">{String(unit.val).padStart(2, '0')}</span>
                      <span className="text-gray-500 text-[10px] font-bold mt-0.5">{unit.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Left Hand: Sound control Board and Equalizer Graph (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
              
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl glass-panel border border-white/10 p-6 shadow-2xl relative overflow-hidden"
              >
                {/* Neon ambient ring */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-pink-500/15 rounded-full blur-xl" />

                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <h3 className="font-extrabold text-white text-sm md:text-base">
                    محاكي لوحة التشغيل الموسيقية (Sound Synth)
                  </h3>
                  <span className="text-[10px] font-bold text-yellow-300 leading-none bg-yellow-500/15 py-1 px-3 rounded-full border border-yellow-500/20">
                    BPM: 120
                  </span>
                </div>

                {/* Synth interactive Dashboard */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between gap-3 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <div>
                      <h4 className="font-bold text-xs text-white">إيقاع الحفلة (Moroccan Electro Beat)</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                        اضغط للاستماع فوراً لنموذج توليف صوتي حي من ديجي عماد.
                      </p>
                    </div>

                    <button
                      onClick={handleToggleAudio}
                      id="hero-synth-play"
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isAudioPlaying 
                          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                          : 'bg-green-500 hover:bg-green-600 text-black shadow-lg shadow-green-950/40'
                      }`}
                      title={isAudioPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى الخلفية'}
                    >
                      {isAudioPlaying ? (
                        <Volume2 className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 fill-current translate-x-[1px]" />
                      )}
                    </button>
                  </div>

                  {/* Volume Slider control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-purple-300">
                      <span>التحكم بمستوى الصوت:</span>
                      <span>{(audioVolume * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.01"
                      max="0.4"
                      step="0.01"
                      value={audioVolume}
                      onChange={handleVolumeChange}
                      className="w-full accent-yellow-400 cursor-pointer h-1.5 bg-white/10 rounded-lg outline-none"
                    />
                  </div>
                </div>

                {/* Live EQ Visual Wave */}
                <Equalizer analyser={synth.getAnalyser()} isPlaying={isAudioPlaying} />

                {/* Status bar */}
                <div className="flex items-center justify-between text-[10px] text-gray-400 mt-4 pt-4 border-t border-white/5">
                  <span>الصوت المولد: سنتسيزر حقيقي (Web Audio API)</span>
                  <span className="text-yellow-400/80 font-semibold">• متصل ببطاقة الصوت الخاصة بك</span>
                </div>

              </motion.div>

            </div>

          </div>

        </div>

        {/* Small Scroll indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">اسحب للأسفل</span>
          <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
        </div>
      </section>

      {/* 4. ABOUT SECTION (Presentation, Moroccan weddings biography, stats counters) */}
      <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-black/20 to-[#050505]">
        
        {/* Abstract vector accents */}
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Right: Detailed text layout (7 Columns) */}
            <div className="lg:col-span-12 xl:col-span-7 text-right">
              <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-medium text-sm mb-4">
                مسيرة من التميز الفني
              </span>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                ديجي عماد آيت الحسن <br />
                <span className="bg-gradient-to-l from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  هندسة الصوت وشغف التنشيط
                </span>
              </h2>

              {/* Bio ticks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right mb-6">
                {[
                  'تنسيق متكامل ومطابق مسبقاً لرغبات العرسان والمنظمين',
                  'أحدث كواشف ومنظومات الليزر (Moving heads 3D)',
                  'تنسيق كامل مع النكافات وبقية متدخلي الحفل لانتظام تام',
                  'مؤثرات دخان ثقيل مائي (Heavy fog) وشهب نارية بأمن تام'
                ].map((tick, i) => (
                  <div key={i} className="flex gap-2 items-start text-xs font-semibold text-gray-300">
                    <span className="w-5 h-5 rounded bg-yellow-400/15 text-yellow-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                    <span>{tick}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Left Image Placeholder and Contact quick card (5 columns) */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center">
              
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-4 shadow-2xl">
                {/* Simulated portrait image using premium high-resolution placeholder with dynamic masks and shadows */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#110d1f] mb-6 shadow-inner">
                  {/* Backdrop graphic representing DJ desk */}
                  <img 
                    src="https://i.imgur.com/6tYbAlI.jpeg" 
                    alt="ديجي عماد آيت الحسن" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 rounded-2xl"
                  />
                  {/* Glow gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a22] via-transparent to-transparent opacity-90" />
                  
                  {/* Circular visual speaker layout */}
                  <div className="absolute inset-x-4 bottom-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/5 flex items-center justify-between text-right">
                    <div>
                      <h4 className="font-bold text-white text-sm">ديجي عماد آيت الحسن</h4>
                      <p className="text-[10px] text-yellow-400 mt-1">مسير ومدير شركة ديجي عماد للأفراح</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-xs animate-pulse">
                      Live
                    </div>
                  </div>
                </div>

                {/* Traditional Moroccan greeting frame */}
                <span className="block text-center text-xs text-purple-300 font-bold leading-relaxed px-4 py-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  ” حفل زفافكم ليس مجرد مناسبة عادية، بل هو فخر وعائلة نلتزم بتطوير مجهوداتها البصرية والسمعية لتبقى ذكرى خالدة للأبد. “
                </span>
              </div>

            </div>

          </div>

          {/* 5. STATS GRID TIMELINE SECTION */}
          <div 
            ref={statsSectionRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 border-t border-white/5 pt-16"
          >
            {STATS_DATA.map((stat, idx) => (
              <div 
                key={stat.id}
                className="glass-panel border border-white/10 rounded-2xl p-6 text-center shadow-md relative hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-yellow-400 mb-2 group-hover:scale-105 transition-transform">
                  {countedStats[idx]}{stat.suffix}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-2 leading-none">
                  {stat.label}
                </h4>
                <p className="text-gray-500 text-[11px] leading-relaxed hidden sm:block">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SERVICES GRID INJECTION */}
      <Services />

      {/* 7. PORTFOLIO GALLERY GRID INJECTION */}
      <Gallery />

      {/* 7.5. TIKTOK REALS SHOWCASE INJECTION */}
      <TikTokShowcase />

      {/* 8. PERFORMANCE MAP INJECTION */}
      <LivePerformanceMap />

      {/* 9. TESTIMONIALS SLIDER INJECTION */}
      <Testimonials />

      {/* 9.5 DEDICATED PREMIUM BOOKING CTA SECTION */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#050505] to-black">
        {/* Glowing glass background atmospheric lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-gradient-to-b from-[#0e0e0e] to-black border border-white/10 p-10 md:p-14 relative overflow-hidden shadow-2xl shadow-green-950/10"
          >
            {/* Animated glowing border strip */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-yellow-400/10 to-purple-600/20 opacity-20 blur-xl pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />

            {/* Glowing neon pulse ring */}
            <div className="w-16 h-16 rounded-full mx-auto mb-6 bg-gradient-to-tr from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 relative">
              <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
              <img 
                src="https://i.imgur.com/tHXJKsr.png" 
                alt="DJ Imad CTA Logo" 
                className="w-11 h-11 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
            </div>

            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              احجز حفلتك الآن مع DJ IMAD
            </h3>
            
            <p className="text-gray-300 text-sm md:text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              تنشيط احترافي للأعراس والمناسبات بجودة عالية وأجواء لا تنسى
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              {/* WhatsApp Booking */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-extrabold text-xs transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
              >
                <div className="w-2 h-2 rounded-full bg-black animate-ping shrink-0" />
                <span>احجز حفلتك الآن عبر واتساب</span>
              </a>

              {/* TikTok previous events */}
              <a
                href="https://www.tiktok.com/@cha3bil3aziz3"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" className="text-pink-500 inline shrink-0">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.74-.24-.23-.45-.48-.65-.74v7.71c.06 2.44-1.02 4.96-3.14 6.13-2.13 1.25-4.97 1.34-7.14.22-2.32-1.14-3.95-3.69-3.95-6.35 0-2.61 1.55-5.11 3.82-6.31 1.76-.96 3.92-1.11 5.79-.38.01.07.03.14.04.22.01.81.01 1.62.01 2.44-.09-.07-.18-.13-.28-.19-1.4-.73-3.21-.57-4.43.43-.98.78-1.5 2.05-1.42 3.29.09 1.64 1.35 3.1 2.99 3.29 1.56.24 3.19-.61 3.73-2.06.27-.64.31-1.34.3-2.03V.02z" />
                </svg>
                <span>شاهد أجواء الحفلات على تيك توك</span>
              </a>
            </div>
            
            {/* Conversion optimization trust badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shrink-0" />
              <span>رد سريع خلال دقيقتين • متاح طيلة أيام الأسبوع</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. BOOKING FORM PANEL INJECTION */}
      <BookingForm />

      {/* 11. FAQ ACCORDION SECTION INJECTION */}
      <FAQ />

      {/* 12. CONTACT COORDINATES SECTION & GLOWING BANNER */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black/40 to-[#050505] border-t border-white/5">
        
        {/* Colorful flare spheres */}
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Huge Call to Action Banner Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#100925] to-black border border-purple-500/20 p-8 md:p-12 text-center mb-16 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient spot glows */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              احجز حفلتك الآن واضمن موعدك!
            </h3>
            
            <p className="text-gray-300 font-light text-base md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              لاتتردد في الاتصال بنا اليوم للتحدث مباشرة مع ديجي عماد والاستفسار عن باقات الأفراح وهندسة الليزر لضمان توفر التاريخ المناسب لك.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:0618407049"
                className="py-3 px-8 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-sm transition-all pointer-events-auto cursor-pointer flex items-center gap-2 shadow-lg shadow-yellow-950/40"
              >
                <Phone className="w-4.5 h-4.5 fill-current" />
                <span>اتصل بنا هاتفياً</span>
              </a>
              <a
                href="https://wa.me/212618407049"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-8 rounded-full bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/30 font-extrabold text-sm transition-all pointer-events-auto cursor-pointer flex items-center gap-2"
              >
                <MessageSquare className="w-4.5 h-4.5" />
                <span>تواصل واتساب سريع</span>
              </a>
            </div>
          </motion.div>

          {/* Social Links Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* TikTok - Main Social Highlight */}
            <div className="lg:col-span-1 relative overflow-hidden glass-panel border border-pink-500/35 bg-gradient-to-tr from-[#FE2C55]/10 via-transparent to-[#25F4EE]/5 p-6 text-right shadow-[0_0_15px_rgba(254,44,85,0.1)] hover:shadow-[0_0_25px_rgba(254,44,85,0.25)] hover:border-pink-500/60 transition-all duration-300 flex flex-col justify-between group">
              <span className="absolute top-1.5 left-1.5 bg-[#FE2C55] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full animate-pulse">
                الأساسي
              </span>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[#25F4EE] group-hover:text-[#FE2C55] transition-colors relative">
                    <span className="absolute inset-[-2px] rounded-full border border-pink-500/20 group-hover:animate-ping" />
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.74-.24-.23-.45-.48-.65-.74v7.71c.06 2.44-1.02 4.96-3.14 6.13-2.13 1.25-4.97 1.34-7.14.22-2.32-1.14-3.95-3.69-3.95-6.35 0-2.61 1.55-5.11 3.82-6.31 1.76-.96 3.92-1.11 5.79-.38.01.07.03.14.04.22.01.81.01 1.62.01 2.44-.09-.07-.18-.13-.28-.19-1.4-.73-3.21-.57-4.43.43-.98.78-1.5 2.05-1.42 3.29.09 1.64 1.35 3.1 2.99 3.29 1.56.24 3.19-.61 3.73-2.06.27-.64.31-1.34.3-2.03V.02z" />
                    </svg>
                  </div>
                  <h4 className="text-gray-400 text-xs font-bold uppercase">قناتنا الأساسية للتواصل</h4>
                </div>
                <p className="text-sm font-extrabold text-white mb-1.5 font-mono">@cha3bil3aziz3</p>
                <p className="text-gray-400 text-[10px] leading-relaxed mb-4">انضم إلى ربع مليون متابع على المنصة لمشاهدة المباشرات وهياج الحفلات!</p>
              </div>
              <a 
                href="https://www.tiktok.com/@cha3bil3aziz3" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs text-[#25F4EE] group-hover:text-white font-extrabold flex items-center gap-1.5 hover:underline pointer-events-auto cursor-pointer"
              >
                <span>شاهد العروض والكبسولات ←</span>
              </a>
            </div>

            {/* Phone contact */}
            <div className="glass-panel border border-white/5 rounded-2xl p-6 text-right shadow-md hover:border-white/10 transition-colors flex flex-col justify-between">
              <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase mb-2">رقم الهاتف الرسمي</h4>
                <p className="text-lg font-extrabold text-white mb-3 font-mono">0618407049</p>
                <p className="text-gray-500 text-[10px] leading-relaxed mb-4">متاح للمشاورات المباشرة وحجز جدول التواريخ طيلة الأسبوع.</p>
              </div>
              <a href="tel:0618407049" className="text-xs text-yellow-400 font-semibold hover:underline cursor-pointer pointer-events-auto">
                اتصال فوري هاتفياً ←
              </a>
            </div>

            {/* Email Contact Placeholder */}
            <div className="glass-panel border border-white/5 rounded-2xl p-6 text-right shadow-md hover:border-white/10 transition-colors flex flex-col justify-between">
              <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase mb-2">البريد الإلكتروني للعمل</h4>
                <p className="text-xs font-extrabold text-white mb-3 font-mono truncate">booking@djimad.ma</p>
                <p className="text-gray-500 text-[10px] leading-relaxed mb-4">مخصص لطلبات الفنادق الكبرى، المهرجانات، والجهات والمؤسسات الرسمية.</p>
              </div>
              <span className="text-[10px] text-gray-400 font-semibold">
                مستعدون للتنظيم الاحترافي
              </span>
            </div>

            {/* Instagram Link */}
            <div className="glass-panel border border-white/5 rounded-2xl p-6 text-right shadow-md hover:border-white/10 transition-colors flex flex-col justify-between">
              <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase mb-2">إنستغرام الرسمي</h4>
                <p className="text-sm font-extrabold text-white mb-3 font-mono">@DJ_IMAD_OFFICIAL</p>
                <p className="text-gray-500 text-[10px] leading-relaxed mb-4">لمتابعة كواليس الأيام والمستجدات وتجهيز الرحلات والستوريات اليومية.</p>
              </div>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs text-pink-400 font-semibold hover:underline cursor-pointer pointer-events-auto flex items-center gap-1.5 self-start justify-end"
              >
                <span>متابعة لقطاتنا اليومية</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Facebook Link */}
            <div className="glass-panel border border-white/5 rounded-2xl p-6 text-right shadow-md hover:border-white/10 transition-colors flex flex-col justify-between">
              <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase mb-2">صفحتنا على فيسبوك</h4>
                <p className="text-sm font-extrabold text-white mb-3 font-mono">DJ Imad Events Moroc</p>
                <p className="text-gray-500 text-[10px] leading-relaxed mb-4">تغطية الألبومات الشاملة وآراء العائلات والمنسقين بالمغرب.</p>
              </div>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs text-blue-400 font-semibold hover:underline cursor-pointer pointer-events-auto flex items-center gap-1.5 self-start justify-end"
              >
                <span>رابط الصفحة الرسمية</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 13. LUXURY FOOTER LAYOUT & SOCIAL HANDLES & ANIMATED WAVE CSS */}
      <footer className="bg-[#050505] border-t border-white/5 relative overflow-hidden">
        
        {/* Dynamic Equalizer-like wave graph structure in footer backing */}
        <div className="absolute inset-x-0 bottom-0 h-10 opacity-10 pointer-events-none flex justify-center gap-1 items-end select-none">
          {Array.from({ length: 60 }).map((_, i) => {
            const h = Math.sin(i * 0.2) * 20 + 20 + (Math.random() * 10);
            return <div key={i} className="w-1 bg-[#a855f7] rounded-t" style={{ height: `${h}px` }} />;
          })}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right mb-12 border-b border-white/5 pb-12">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 justify-end">
                <h4 className="font-black text-xl text-white">ديجي عماد آيت الحسن</h4>
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/10 shrink-0 shadow-lg">
                  <img 
                    src="https://i.imgur.com/tHXJKsr.png" 
                    alt="DJ IMAD Logo Footer" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <p className="text-gray-400 font-light text-xs leading-relaxed">
                الشركة الرائدة في تنشيط الأعراس الفاخرة، حفلات الخطوبة، المهرجانات، المناسبات الخاصة، وهندسة أنظمة الصوت والإضاءة والمؤثرات الضوئية والنارية الآمنة بالمملكة المغربية.
              </p>
            </div>

            {/* Quick links to anchors */}
            <div className="space-y-3">
              <h5 className="font-bold text-sm text-yellow-400">روابط تكميلية للوصول السريع</h5>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">من نحن ومقوماتنا</a>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">باقات الخدمات</a>
                <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">معرض المباشرات</a>
                <a href="#coverage" className="text-gray-400 hover:text-white transition-colors">المناطق المشمولة</a>
                <a href="#booking" className="text-gray-400 hover:text-white transition-colors">احجز مناسبتك</a>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">إجابات توضيحية</a>
              </div>
            </div>

            {/* Headquarters address information */}
            <div className="space-y-3">
              <h5 className="font-bold text-sm text-purple-400">مقر العمل والتواصل الرسمي</h5>
              <div className="space-y-1 text-xs text-gray-400">
                <p>مكتب التنسيق المركزي: أولاد تايمة / أكادير، المغرب</p>
                <p className="pt-2">الهاتف: <a href="tel:0618407049" className="text-white hover:underline font-mono">0618407049</a></p>
                <p>الواتساب: <a href="https://wa.me/212618407049" className="text-white hover:underline font-mono">0618407049</a></p>
              </div>
            </div>

          </div>

          {/* Copywrite label */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-right gap-4 text-xs text-gray-500 font-semibold border-t border-white/5 pt-6">
            <p>© {new Date().getFullYear()} ديجي عماد آيت الحسن (DJ IMAD). جميع الحقوق محفوظة برواتب التوثيق الفنية المغربية.</p>
            <p>صُمّم بترف ورقي لمحبين الصوت الفاخر والأعراس الاستثنائية.</p>
          </div>

        </div>
      </footer>

      {/* 14. PREMIUM FLOATING ACTION WIDGET (Neon Pulsing WhatsApp & Sound Wave) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Floating Chat Message Bubble */}
        <AnimatePresence>
          {showFloatBubble && !chatBubbleClosed && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 1 }}
              className="mb-1 mr-2 px-4 py-3 bg-black/95 backdrop-blur-md border border-green-500/40 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.25)] max-w-[260px] text-right text-xs relative select-none pointer-events-auto flex items-start gap-2"
            >
              {/* Close button */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setChatBubbleClosed(true);
                }}
                className="absolute top-1 left-1.5 w-4 h-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full flex items-center justify-center text-[8px] cursor-pointer"
                title="إغلاق التنبيه"
              >
                ✕
              </button>

              {/* Little Green Dot blinking */}
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping shrink-0 mt-1" />

              <div>
                <p className="font-extrabold text-[#22c55e] mb-0.5">ديجي عماد متصل الآن 🟢</p>
                <p className="text-gray-300 font-light leading-relaxed">
                  مرحباً بك! تواصل معي لحجز موعد حفل زفافك فورا واطلب عرض السعر!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Buttons Combo Container */}
        <div className="flex flex-col gap-3 items-center pointer-events-auto">
          
          {/* Glowing premium floating TikTok Button */}
          <a 
            href="https://www.tiktok.com/@cha3bil3aziz3"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full bg-[#050505] text-white flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(254,44,85,0.4)] hover:shadow-[0_0_30px_rgba(37,244,238,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer pointer-events-auto"
            title="شاهد أجواء الحفلات على تيك توك"
          >
            {/* Custom dual glowing pulse rings for TikTok cyan/pink */}
            <span className="absolute inset-x-[-4px] inset-y-[-4px] rounded-full bg-[#FE2C55]/20 animate-ping [animation-duration:1.6s]" />
            <span className="absolute inset-x-[-10px] inset-y-[-10px] rounded-full bg-[#25F4EE]/10 animate-ping [animation-duration:3.2s]" />

            {/* Glowing cyan particle effects hovering inside */}
            <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-[#25F4EE] rounded-full animate-ping [animation-delay:0.5s]" />

            {/* TikTok Custom luxury icon */}
            <svg 
              className="w-6 h-6 text-white group-hover:text-[#25F4EE] transition-colors"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.74-.24-.23-.45-.48-.65-.74v7.71c.06 2.44-1.02 4.96-3.14 6.13-2.13 1.25-4.97 1.34-7.14.22-2.32-1.14-3.95-3.69-3.95-6.35 0-2.61 1.55-5.11 3.82-6.31 1.76-.96 3.92-1.11 5.79-.38.01.07.03.14.04.22.01.81.01 1.62.01 2.44-.09-.07-.18-.13-.28-.19-1.4-.73-3.21-.57-4.43.43-.98.78-1.5 2.05-1.42 3.29.09 1.64 1.35 3.1 2.99 3.29 1.56.24 3.19-.61 3.73-2.06.27-.64.31-1.34.3-2.03V.02z" />
            </svg>
          </a>

          {/* Glowing premium floating WhatsApp Button */}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full bg-[#25d366] text-black flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer pointer-events-auto"
            title="تحدث مع عماد فوراً على واتساب"
          >
            {/* Custom dual glowing pulse rings */}
            <span className="absolute inset-x-[-4px] inset-y-[-4px] rounded-full bg-green-500/20 animate-ping [animation-duration:1.5s]" />
            <span className="absolute inset-x-[-10px] inset-y-[-10px] rounded-full bg-green-500/10 animate-ping [animation-duration:3s]" />

            {/* Glowing neon particle effects (little green stars) hovering inside */}
            <span className="absolute top-1 left-2 w-1.5 h-1.5 bg-white rounded-full animate-ping [animation-delay:1s]" />
            
            {/* WhatsApp Custom luxury icon */}
            <svg 
              className="w-7 h-7 fill-black"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.966.01c3.182.001 6.176 1.24 8.423 3.49 2.247 2.249 3.483 5.244 3.481 8.424-.004 6.619-5.34 11.956-11.91 11.956-1.996 0-3.958-.501-5.709-1.455L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.7 1.45 5.2 0 9.4-4.2 9.4-9.4 0-2.5-1-4.9-2.8-6.7-1.8-1.8-4.2-2.8-6.7-2.8-5.2 0-9.4 4.2-9.4 9.4 0 1.8.5 3.5 1.5 5l-.33 1.2.33-.3zm11.72-6.505c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.59.13-.17.26-.68.86-.83 1.03-.15.17-.3.19-.56.06-.26-.13-1.1-.41-2.1-1.3-.78-.7-1.31-1.57-1.46-1.83-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.46.13-.16.18-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.59-1.42-.81-1.94-.21-.52-.43-.45-.59-.46-.15-.01-.33-.01-.51-.01-.18 0-.48.07-.73.34-.26.27-.98.96-.98 2.33s1 2.7 1.14 2.9c.14.2 1.96 3 4.75 4.2.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.53-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.1-.26-.18-.52-.31z" />
            </svg>

            {/* Notification Badge */}
            <span className="absolute -top-1 -left-1 bg-red-500 text-white font-extrabold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#101010] animate-bounce shadow">
              1
            </span>
          </a>

          {/* Floating Quick Back to Top dial */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-[#101010]/90 border border-white/10 text-white hover:bg-white/15 flex items-center justify-center transition-all cursor-pointer pointer-events-auto shadow-lg"
            title="الرجوع للأعلى"
          >
            ↑
          </button>  
        </div>
      </div>

    </div>
  );
}
