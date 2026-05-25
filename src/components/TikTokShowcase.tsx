import React from 'react';
import { motion } from 'motion/react';
import { Heart, Eye, Play, ExternalLink, Sparkles, Flame, Users, Music } from 'lucide-react';

interface TikTokVideoCard {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: string;
  views: string;
  shares: string;
  tag: string;
}

const TIKTOK_VIDEOS: TikTokVideoCard[] = [
  {
    id: 't-wedding',
    category: 'weddings',
    title: 'أعراس مغربية فاخرة',
    description: 'دخول العروسين الأسطوري مع أجواء الدفء والسرور وتأثير الدخان الكثيف الرومانسي.',
    imageUrl: 'https://i.imgur.com/AflUXuv.jpeg',
    likes: '142.5K',
    views: '1.2M',
    shares: '12K',
    tag: 'حفل زفاف ملكي'
  },
  {
    id: 't-party',
    category: 'atmosphere',
    title: 'صخب الحفلات الشعبية والعصرية',
    description: 'مزج صاخب بين الأصالة والرموز التراثية المغربية لأقصى درجات الفرح والتفاعل.',
    imageUrl: 'https://i.imgur.com/BKnujUJ.jpeg',
    likes: '98.2K',
    views: '840K',
    shares: '8.4K',
    tag: 'طاقة خرافية'
  },
  {
    id: 't-performance',
    category: 'dj-performance',
    title: 'منصات ديجي عماد الحيوية',
    description: 'أداء مباشر مذهل يمزج بين الأغاني التراثية العريقة والتوزيعات الموسيقية الغربية الصاخبة.',
    imageUrl: 'https://i.imgur.com/6tYbAlI.jpeg',
    likes: '125.7K',
    views: '1.1M',
    shares: '15K',
    tag: 'بث حي ومباشر'
  },
  {
    id: 't-crowd',
    category: 'crowd-energy',
    title: 'تفاعل جماهيري خارق',
    description: 'جمهور وعائلات متفاعلة ترقص وتعيش الفرحة الحقيقية غامرة بالدقة والبرزة الرائعة.',
    imageUrl: 'https://i.imgur.com/VBMEjDE.jpeg',
    likes: '110.4K',
    views: '950K',
    shares: '11K',
    tag: 'زلزال من النشاط'
  },
  {
    id: 't-effects',
    category: 'effects',
    title: 'عجائب الشهب النارية والليزر',
    description: 'عروض بصرية مشتعلة مع ليزر مجسم ونظام إضاءة يتفاعل بنبض الموسيقى مع الحضور.',
    imageUrl: 'https://i.imgur.com/9H00UPy.png',
    likes: '160.1K',
    views: '1.5M',
    shares: '18K',
    tag: 'مفرقعات ودخان مائي'
  }
];

export function TikTokShowcase() {
  const profileUrl = "https://www.tiktok.com/@cha3bil3aziz3";

  return (
    <section id="tiktok-showcase" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#0b0713]/80 to-[#050505] border-t border-purple-500/10">
      
      {/* Visual background gradient glow representation of TikTok themes */}
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] bg-[#25F4EE]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[450px] h-[450px] bg-[#FE2C55]/5 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Animated floating subtle musical notes as floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {Array.from({ length: 15 }).map((_, i) => {
          const size = Math.random() * 20 + 10;
          return (
            <motion.div
              key={i}
              className="absolute text-purple-500/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {i % 3 === 0 ? (
                <Music size={size} />
              ) : i % 3 === 1 ? (
                <Sparkles size={size} />
              ) : (
                <Flame size={size} />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        
        {/* Header containing animated logo & titles */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3.5 px-5 py-2 rounded-full bg-black/60 border border-white/10 text-white font-semibold text-xs md:text-sm mb-6 shadow-xl relative"
          >
            {/* Blinking glow background */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#25F4EE]/35 to-[#FE2C55]/35 opacity-40 blur-md pointer-events-none animate-pulse-slow" />
            
            {/* Real animated TikTok Icon */}
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE2C55] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25F4EE]"></span>
            </span>

            <span className="text-gray-300 relative z-10 flex items-center gap-1.5 font-mono">
              <span className="text-white font-extrabold font-sans">@cha3bil3aziz3</span>
              على تيك توك لحفلات المغرب
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-5"
          >
            شاهد زلزال الطاقة والأفراح{" "}
            <span className="block mt-2 lg:inline bg-gradient-to-l from-[#25F4EE] via-white to-[#FE2C55] bg-clip-text text-transparent">
              مباشرة من تيك توك الحفلات
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            نثق أن اللقطات الحية وصدق بهجة العائلات المغربية في أعراسنا هي أفضل دليل لثقتكم. استكشف نبض الميدان، حركات الحشود والشهب النارية!
          </motion.p>
        </div>

        {/* Video simulation cards grid - Horizontal scrolling on mobile, grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {TIKTOK_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer aspect-[9/16] shadow-xl hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-end"
            >
              {/* Image thumbnail placeholder representing actual TikTok loop */}
              <div className="absolute inset-0 z-0">
                <img
                  src={video.imageUrl}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-100 transition-opacity duration-300"
                />
                
                {/* Only bottom gradient to keep caption text perfectly readable, leaving the rest of the video thumbnail crystal clear */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
              </div>

              {/* Top video tag/category pill */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5">
                <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-black/60 rounded-full border border-white/10 backdrop-blur-md">
                  {video.tag}
                </span>
              </div>

              {/* Glowing play symbol floating center */}
              <div className="absolute inset-0 flex items-center justify-center z-11">
                <motion.div
                  className="w-14 h-14 rounded-full bg-black/70 border-2 border-white text-white flex items-center justify-center shadow-lg relative cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                  onClick={() => window.open(profileUrl, '_blank')}
                >
                  {/* Cyber TikTok Neon Ripple borders */}
                  <span className="absolute inset-[-4px] rounded-full border border-[#25F4EE]/40 animate-ping [animation-duration:1.4s]" />
                  <span className="absolute inset-[-8px] rounded-full border border-[#FE2C55]/30 animate-ping [animation-duration:2.8s]" />
                  <Play className="w-5 h-5 text-white fill-current translate-x-[-1px]" />
                </motion.div>
              </div>

              {/* Virtual Side Icons panel simulating TikTok Player UI */}
              <div className="absolute left-3.5 bottom-28 z-20 flex flex-col items-center gap-4 text-white">
                
                {/* Heart / Likes */}
                <div className="flex flex-col items-center gap-1 group/btn" onClick={() => window.open(profileUrl, '_blank')}>
                  <div className="w-9 h-9 rounded-full bg-black/60 border border-white/5 flex items-center justify-center text-[#FE2C55] hover:bg-[#FE2C55] hover:text-white transition-all shadow shadow-black">
                    <Heart className="w-4.5 h-4.5 fill-current" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-300">{video.likes}</span>
                </div>

                {/* Video views indicator */}
                <div className="flex flex-col items-center gap-1" onClick={() => window.open(profileUrl, '_blank')}>
                  <div className="w-9 h-9 rounded-full bg-black/60 border border-white/5 flex items-center justify-center text-[#25F4EE] hover:bg-[#25F4EE] hover:text-black transition-all shadow shadow-black">
                    <Eye className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-300">{video.views}</span>
                </div>
              </div>

              {/* Video copy / captions text overlay */}
              <div className="p-5 relative z-20 text-right">
                
                {/* TikTok style author address */}
                <p className="text-[#25F4EE] text-xs font-bold font-mono tracking-wide mb-1 flex items-center gap-1.5 justify-end">
                  <span>@cha3bil3aziz3</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                </p>
                
                <h4 className="text-white font-extrabold text-sm mb-1.5 line-clamp-1">
                  {video.title}
                </h4>
                
                <p className="text-gray-300 text-[11px] font-light leading-relaxed mb-3 line-clamp-2">
                  {video.description}
                </p>

                {/* Simulated sound track indicator */}
                <div className="flex items-center gap-1.5 justify-end text-[10px] text-gray-400 font-mono border-t border-white/5 pt-2">
                  <span className="truncate max-w-[130px]">الصوت الأصلي - ديجي عماد آيت الحسن</span>
                  <Music className="w-3 h-3 text-purple-400 shrink-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* High-Impact conversion CTAs */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 max-w-4xl mx-auto">
          
          <motion.a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto py-4 px-10 rounded-full bg-gradient-to-r from-[#FE2C55] via-black to-[#25F4EE] p-[2px] shadow-lg hover:shadow-[0_0_30px_rgba(254,9,121,0.25)] transition-all pointer-events-auto cursor-pointer flex justify-center items-center"
          >
            <div className="w-full h-full bg-[#050505] rounded-full px-8 py-3 flex items-center justify-center gap-3">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" className="text-[#FE2C55] shrink-0 animate-bounce">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.74-.24-.23-.45-.48-.65-.74v7.71c.06 2.44-1.02 4.96-3.14 6.13-2.13 1.25-4.97 1.34-7.14.22-2.32-1.14-3.95-3.69-3.95-6.35 0-2.61 1.55-5.11 3.82-6.31 1.76-.96 3.92-1.11 5.79-.38.01.07.03.14.04.22.01.81.01 1.62.01 2.44-.09-.07-.18-.13-.28-.19-1.4-.73-3.21-.57-4.43.43-.98.78-1.5 2.05-1.42 3.29.09 1.64 1.35 3.1 2.99 3.29 1.56.24 3.19-.61 3.73-2.06.27-.64.31-1.34.3-2.03V.02z" />
              </svg>
              <span className="text-white font-black text-xs md:text-sm">تابعنا على TikTok</span>
            </div>
          </motion.a>

          <motion.a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto py-[14px] px-10 rounded-full bg-white/5 hover:bg-white/10 text-white font-black border border-white/20 hover:border-white/30 text-xs md:text-sm transition-all pointer-events-auto cursor-pointer flex items-center justify-center gap-2.5 shadow-xl"
          >
            <span>شاهد الحفلات السابقة</span>
            <ExternalLink className="w-4 h-4 text-[#25F4EE]" />
          </motion.a>
          
        </div>

        {/* Reassuring caption below CTAs to encourage booking */}
        <p className="text-center text-[11px] text-gray-500 font-semibold mt-6">
          🔴 تم رصد ومطالعة جميع الفيديوهات بجودة صوت فائقة ومباشرة من قاعات الحفلات المعتمدة
        </p>

      </div>
    </section>
  );
}
