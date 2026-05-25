import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Eye, X, ChevronLeft, ChevronRight, Share2, Play } from 'lucide-react';
import { GALLERY_DATA } from '../data';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_DATA);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter categorization
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  // Like interaction increments visual counter
  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const isAlreadyLiked = likedIds[id];
    setLikedIds(prev => ({ ...prev, [id]: !isAlreadyLiked }));
    
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: isAlreadyLiked ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    }));
  };

  const openLightbox = (indexInFilteredList: number) => {
    // We map from index in filtered array to index in filtered list
    setLightboxIndex(indexInFilteredList);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-black/40">
      {/* Visual neon light backgrounds */}
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-medium text-sm mb-4">
            معرض الأعمال المباشرة
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-white to-gold-400 bg-clip-text text-transparent mb-5 leading-tight">
            أقوى لحظات حفلاتنا ومناسباتنا
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            لقطات وصور حية توثق الحماس، التنظيم، وأنظمة الإضاءة والمؤثرات التي نغمر بها زبنائنا الأعزاء.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl mx-auto">
          {[
            { key: 'all', label: 'الكل' },
            { key: 'wedding', label: 'الأعراس' },
            { key: 'party', label: 'أعياد ميلاد ومناسبات' },
            { key: 'festival', label: 'المهرجانات' },
            { key: 'lighting', label: 'الإضاءة الاحترافية' },
            { key: 'effects', label: 'المؤثرات والدخان' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              id={`tab-filter-${tab.key}`}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 pointer-events-auto cursor-pointer ${
                filter === tab.key 
                  ? 'bg-gradient-to-l from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-950/40 border border-purple-400/20' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid layout using responsive CSS columns or grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isLiked = likedIds[item.id];
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  onClick={() => openLightbox(index)}
                  className={`relative rounded-2xl overflow-hidden glass-panel border border-white/10 group cursor-pointer ${item.aspectRatio} shadow-xl`}
                >
                  {/* Image */}
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient Dark Overlay Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Play Button Overlay if Video Type */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-purple-600/80 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:bg-purple-500 transition-all duration-300 pointer-events-auto">
                        <Play className="w-6 h-6 fill-current text-white translate-x-[1px]" />
                      </div>
                    </div>
                  )}

                  {/* Meta category badge */}
                  <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded bg-black/60 text-yellow-300 border border-yellow-500/20 backdrop-blur-md">
                    {item.categoryArabic}
                  </span>

                  {/* TikTok Badge on the top-left */}
                  {item.tiktokUrl && (
                    <a
                      href={item.tiktokUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/70 border border-[#FE2C55]/50 text-white text-[10px] sm:text-[11px] font-black cursor-pointer hover:bg-gradient-to-r hover:from-[#FE2C55] hover:to-[#25F4EE] hover:border-white transition-all duration-300 shadow-[0_0_15px_rgba(254,44,85,0.3)] select-none pointer-events-auto group/tk"
                      title="شاهد كواليس المقطع الفيديوي على تيك توك"
                    >
                      <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24" className="text-[#25F4EE] group-hover/tk:text-white group-hover/tk:animate-bounce">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.74-.24-.23-.45-.48-.65-.74v7.71c.06 2.44-1.02 4.96-3.14 6.13-2.13 1.25-4.97 1.34-7.14.22-2.32-1.14-3.95-3.69-3.95-6.35 0-2.61 1.55-5.11 3.82-6.31 1.76-.96 3.92-1.11 5.79-.38.01.07.03.14.04.22.01.81.01 1.62.01 2.44-.09-.07-.18-.13-.28-.19-1.4-.73-3.21-.57-4.43.43-.98.78-1.5 2.05-1.42 3.29.09 1.64 1.35 3.1 2.99 3.29 1.56.24 3.19-.61 3.73-2.06.27-.64.31-1.34.3-2.03V.02z" />
                      </svg>
                      <span className="text-gray-200 group-hover/tk:text-white">فيديو TikTok</span>
                    </a>
                  )}

                  {/* Hover Bottom Details Panel */}
                  <div className="absolute inset-x-0 bottom-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end">
                    
                    <p className="text-white text-sm font-semibold mb-3 leading-snug line-clamp-2">
                      {item.title}
                    </p>

                    {/* Stats Icons Row - Interactive Like and view stats */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          id={`like-btn-${item.id}`}
                          className={`flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-colors ${
                            isLiked ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                          }`}
                        >
                          <Heart className={`w-4.5 h-4.5 ${isLiked ? 'fill-current' : ''}`} />
                          <span>{item.likes}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-xs text-gray-300">
                          <Eye className="w-4.5 h-4.5 text-gray-400" />
                          <span>{item.views}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* TikTok Direct Video Link */}
                        {item.tiktokUrl && (
                          <a
                            href={item.tiktokUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-black/60 border border-[#FE2C55]/35 hover:bg-gradient-to-r hover:from-[#FE2C55]/90 hover:to-[#25F4EE]/90 hover:text-black hover:border-white text-[#25F4EE] cursor-pointer transition-all flex items-center justify-center gap-1 px-2.5 py-1 rounded"
                            onClick={(e) => e.stopPropagation()}
                            title="شاهد كواليس المقطع الفيديوي على تيك توك"
                          >
                            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.74-.24-.23-.45-.48-.65-.74v7.71c.06 2.44-1.02 4.96-3.14 6.13-2.13 1.25-4.97 1.34-7.14.22-2.32-1.14-3.95-3.69-3.95-6.35 0-2.61 1.55-5.11 3.82-6.31 1.76-.96 3.92-1.11 5.79-.38.01.07.03.14.04.22.01.81.01 1.62.01 2.44-.09-.07-.18-.13-.28-.19-1.4-.73-3.21-.57-4.43.43-.98.78-1.5 2.05-1.42 3.29.09 1.64 1.35 3.1 2.99 3.29 1.56.24 3.19-.61 3.73-2.06.27-.64.31-1.34.3-2.03V.02z" />
                            </svg>
                            <span className="text-[10px] font-black">المشاهدة</span>
                          </a>
                        )}

                        {/* Share link to whatsapp */}
                        <a 
                          href={`https://wa.me/212618407049?text=${encodeURIComponent(`سلام ديجي عماد، عجبني هذا العمل بزاف وبغيت نسولك على شي حاجة بحالو: ${item.title}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Share2 className="w-3.5 h-3.5 text-gray-300" />
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button Button */}
              <button 
                onClick={closeLightbox}
                id="lightbox-close"
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all pointer-events-auto cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Slider Controls */}
              <button 
                onClick={prevItem}
                id="lightbox-prev"
                className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all pointer-events-auto cursor-pointer z-30"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button 
                onClick={nextItem}
                id="lightbox-next"
                className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all pointer-events-auto cursor-pointer z-30"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Central Box Layout */}
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="max-w-4xl w-full h-[60vh] md:h-[70vh] flex items-center justify-center relative pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={activeItem.imageUrl} 
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl shadow-black/80 pointer-events-auto border border-white/5"
                />
              </motion.div>

              {/* Bottom Interactive Bar */}
              <div 
                className="max-w-2xl w-full mt-6 text-center text-white pointer-events-auto bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="inline-block px-2.5 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 mb-2 font-mono">
                  {activeItem.categoryArabic}
                </span>
                
                <h4 className="text-base md:text-lg font-bold mb-4">
                  {activeItem.title}
                </h4>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 border-t border-white/5 pt-3">
                  <button
                    onClick={() => handleLike(activeItem.id)}
                    id="lightbox-like-btn"
                    className={`flex items-center gap-2 text-sm font-semibold cursor-pointer transition-all ${
                      likedIds[activeItem.id] ? 'text-red-500 scale-105' : 'text-gray-300 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedIds[activeItem.id] ? 'fill-current' : ''}`} />
                    <span>تفاعل ({activeItem.likes})</span>
                  </button>

                  {activeItem.tiktokUrl && (
                    <a 
                      href={activeItem.tiktokUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-xs py-1.5 px-3.5 rounded bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] hover:opacity-90 text-black font-extrabold transition-all cursor-pointer shadow-[0_0_15px_rgba(254,44,85,0.4)]"
                    >
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" className="text-black shrink-0">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.74-.24-.23-.45-.48-.65-.74v7.71c.06 2.44-1.02 4.96-3.14 6.13-2.13 1.25-4.97 1.34-7.14.22-2.32-1.14-3.95-3.69-3.95-6.35 0-2.61 1.55-5.11 3.82-6.31 1.76-.96 3.92-1.11 5.79-.38.01.07.03.14.04.22.01.81.01 1.62.01 2.44-.09-.07-.18-.13-.28-.19-1.4-.73-3.21-.57-4.43.43-.98.78-1.5 2.05-1.42 3.29.09 1.64 1.35 3.1 2.99 3.29 1.56.24 3.19-.61 3.73-2.06.27-.64.31-1.34.3-2.03V.02z" />
                      </svg>
                      <span>شاهد الفيديو المباشر في TikTok</span>
                    </a>
                  )}

                  <a 
                    href={`https://wa.me/212618407049?text=${encodeURIComponent(`سلام ديجي عماد، شفت هذا العمل وعجبني بزاف في موقعك الرسمي وبغيت نستفسر على حجز: ${activeItem.title}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs py-1.5 px-3 rounded bg-green-500 hover:bg-green-600 text-white font-bold transition-all cursor-pointer"
                  >
                    <span>احجز مثل هذا العرض</span>
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
