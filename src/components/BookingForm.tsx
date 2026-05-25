import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Sparkles, MessageSquare, Phone, User, CheckCircle, Flame, Send } from 'lucide-react';
import { BookingFormInput } from '../types';

interface SavedBooking extends BookingFormInput {
  id: string;
  timestamp: string;
  status: 'pending' | 'confirmed';
}

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormInput>({
    name: '',
    phone: '',
    city: '',
    eventType: 'زفاف',
    eventDate: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [savedBookings, setSavedBookings] = useState<SavedBooking[]>([]);

  // Load bookings from localStorage
  useEffect(() => {
    const cached = localStorage.getItem('dj_imad_bookings');
    if (cached) {
      try {
        setSavedBookings(JSON.parse(cached));
      } catch (e) {
        console.error('Failed to parse bookings from localStorage');
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'الرجاء إدخال الاسم الكريم';
    if (!formData.phone.trim()) {
      tempErrors.phone = 'الرجاء إدخال رقم هاتف للتواصل';
    } else if (!/^(05|06|07)\d{8}$/.test(formData.phone.trim()) && formData.phone.length < 10) {
      // Simple Moroccan mobile validation
      tempErrors.phone = 'رقم الهاتف غير صحيح (مثال: 0618407049)';
    }
    if (!formData.city.trim()) tempErrors.city = 'الرجاء كتابة مدينة الحفل';
    if (!formData.eventDate) tempErrors.eventDate = 'الرجاء تحديد تاريخ الحفل';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const formatWhatsAppText = (data: BookingFormInput): string => {
    return `أهلاً ديجي عماد آيت الحسن 👋\n\nأود الاستفسار وحجز موعد لحفلتنا:\n\n👤 *الاسم الكريم:* ${data.name}\n📞 *رقم الهاتف:* ${data.phone}\n📍 *المدينة:* ${data.city}\n🎉 *نوع الحفلة:* ${data.eventType}\n📅 *تاريخ الحفل:* ${data.eventDate}\n💬 *تفاصيل إضافية:* ${data.message || 'لا توجد'}\n\nأرجو تأكيد توفر الموعد والمجهودات المطلوبة. شكراً لك! ✨`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newBooking: SavedBooking = {
      ...formData,
      id: `bk-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'pending'
    };

    const updated = [newBooking, ...savedBookings];
    setSavedBookings(updated);
    localStorage.setItem('dj_imad_bookings', JSON.stringify(updated));

    setIsSubmitted(true);
    
    // Smooth reset of form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        city: '',
        eventType: 'زفاف',
        eventDate: '',
        message: ''
      });
    }, 1000);
  };

  const handleWhatsAppRedirect = () => {
    // Generate prefilled text and fire up WhatsApp
    const whatsappURL = `https://wa.me/212618407049?text=${encodeURIComponent(formatWhatsAppText(formData))}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <section id="booking" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#050505]">
      {/* Absolute particle graphics */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form left content block (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel border border-purple-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Highlight background lines */}
              <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-yellow-400 via-pink-500 to-purple-600 rounded-bl" />
              
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                احجز موعد حفلتك الآن مع عماد آيت الحسن
              </h3>
              <p className="text-gray-400 font-light text-sm md:text-base mb-8">
                يرجى ملء النموذج أدناه للتأكد من توفر الموعد وحيازة الخدمات الاحترافية لليلتكم المميزة.
              </p>

              {/* Success Notification Popup */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 flex flex-col gap-3 mb-8"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">تم تسجيل طلب حجزك بنجاح محلياً!</h4>
                        <p className="text-xs text-emerald-400/90 leading-relaxed mt-1">
                          يمكنك أيضاً لمس زر الواتساب لإرسال الطلب بشكل فوري وهاتفي ومباشر لديجي عماد لضمان الموعد فوراً.
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleWhatsAppRedirect}
                      id="whatsapp-confirm-success"
                      className="w-full py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-black font-extrabold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-green-950/40 pointer-events-auto"
                    >
                      <Phone className="w-4 h-4 fill-current" />
                      إرسال الطلب وإكمال الحجز عبر الواتساب فوراً
                    </button>
                    
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      id="close-success-btn"
                      className="text-[11px] text-emerald-400/70 hover:text-emerald-300 underline self-center mt-1 cursor-pointer pointer-events-auto focus:outline-none"
                    >
                      إدخال حجز جديد
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-gray-300 mb-2 mr-1">الاسم الكامل <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full pr-11 pl-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          errors.name ? 'border-red-500/65 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="أدخل اسمك الكريم"
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1.5 mr-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-gray-300 mb-2 mr-1">رقم الهاتف للتواصل <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-500" />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full pr-11 pl-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          errors.phone ? 'border-red-500/65 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="مثال: 0618407049"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1.5 mr-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Row 2: City and Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-xs font-bold text-gray-300 mb-2 mr-1">المدينة المقترحة للحفلة <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-500" />
                      </span>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`block w-full pr-11 pl-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          errors.city ? 'border-red-500/65 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                        }`}
                        placeholder="أكادير، أولاد تايمة، تارودانت..."
                      />
                    </div>
                    {errors.city && <p className="text-red-400 text-xs mt-1.5 mr-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="eventType" className="block text-xs font-bold text-gray-300 mb-2 mr-1">نوع المناسبة</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Sparkles className="h-5 w-5 text-gray-500" />
                      </span>
                      <select
                        name="eventType"
                        id="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="block w-full pr-11 pl-4 py-3 bg-[#110d1f] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-white/20 cursor-pointer"
                      >
                        <option value="زفاف">حفل زفاف مغربي تقليدي / عصري</option>
                        <option value="خطوبة">حفل عقيقة / خطوبة عائلية</option>
                        <option value="عيد ميلاد">عيد ميلاد / مناسبة عائلية خاصة</option>
                        <option value="مهرجان">حفل موسيقي عام / مهرجان هواء طلق</option>
                        <option value="أخرى">افتتاح شركة / مناسبة وبقية المناسبات كبرى</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 3: Event Date */}
                <div>
                  <label htmlFor="eventDate" className="block text-xs font-bold text-gray-300 mb-2 mr-1">تاريخ المناسبة المقدّر <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </span>
                    <input
                      type="date"
                      name="eventDate"
                      id="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={`block w-full pr-11 pl-4 py-3 bg-white/5 border rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                        errors.eventDate ? 'border-red-500/65 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                  </div>
                  {errors.eventDate && <p className="text-red-400 text-xs mt-1.5 mr-1">{errors.eventDate}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-gray-300 mb-2 mr-1">تفاصيل ورغبات إضافية لو رغبت (اختياري)</label>
                  <div className="relative">
                    <span className="absolute top-3.5 right-4 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-500" />
                    </span>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full pr-11 pl-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-white/20"
                      placeholder="اكتب هنا الأغاني المفضلة لديك، خدمات المفرقعات، الدخان والتبوريدة التي تطالب بها..."
                    />
                  </div>
                </div>

                {/* Submitting Buttons Dual Panel */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  
                  {/* Local Submit Submit */}
                  <button
                    type="submit"
                    id="submit-form-btn"
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-l from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-900/30 active:scale-95 pointer-events-auto"
                  >
                    <Send className="w-4.5 h-4.5" />
                    حفظ وطلب الحجز
                  </button>

                  {/* Direct WhatsApp WhatsApp Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (validate()) {
                        handleWhatsAppRedirect();
                      } else {
                        // If empty, open normal conversation
                        window.open('https://wa.me/212618407049', '_blank');
                      }
                    }}
                    id="whatsapp-direct-submit"
                    className="py-3 px-6 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-300 border border-green-500/30 font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
                  >
                    <Flame className="w-4.5 h-4.5 text-yellow-500" />
                    تأكيد سريع بالواتساب
                  </button>
                </div>

              </form>
            </motion.div>
          </div>

          {/* Bookings Display Sidebar (5 cols) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6 lg:h-full justify-start">
            
            {/* Instant Action CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl glass-panel border border-yellow-500/20 p-6 flex flex-col text-right relative overflow-hidden h-fit"
            >
              <div className="absolute top-0 left-0 bg-yellow-500/15 text-yellow-300 text-[10px] font-extrabold py-1 px-3.5 rounded-br-2xl border-r border-b border-yellow-500/20">
                تأكيد بضغطة زر
              </div>
              
              <h4 className="text-xl font-bold text-yellow-400 mb-2">
                هل تفضل المحادثة الهاتفية المباشرة؟
              </h4>
              <p className="text-gray-300 font-light text-xs md:text-sm leading-relaxed mb-4">
                تواصل بشكل هاتفى فوري على الرقم الخاص بديجي عماد للاستفسار عن الأثمنة، عروض الباقات، وتوفر القاعة بالتسجيل المباشر وتفادي فترات الانتظار.
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:0618407049"
                  className="py-2.5 px-5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-md shadow-yellow-950/20"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  اتصل الآن: 0618407049
                </a>
                <a
                  href="https://wa.me/212618407049"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-5 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-300 border border-green-500/30 font-extrabold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  واتساب مباشر
                </a>
              </div>
            </motion.div>

            {/* Local Bookings Timeline component */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl glass-panel border border-white/10 p-6 flex-grow flex flex-col"
            >
              <h4 className="text-base font-bold text-white mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <span>طلبات حجوزاتي الأخيرة</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25">
                  {savedBookings.length} حجوزات مسجلة
                </span>
              </h4>

              {savedBookings.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center flex-grow">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-3 border border-white/5">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-400 font-light max-w-xs leading-relaxed">
                    لم تحفظ أي حجوزات بعد. بمجرد ملء النموذج والضغط على حفظ، سيتم إدراج المناسبة هنا لمراقبة ومطالعة الحالة محلياً.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {savedBookings.map((bk) => (
                    <div 
                      key={bk.id}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/15 hover:border-white/25 transition-all text-right relative group"
                    >
                      <button
                        onClick={() => {
                          const updated = savedBookings.filter(b => b.id !== bk.id);
                          setSavedBookings(updated);
                          localStorage.setItem('dj_imad_bookings', JSON.stringify(updated));
                        }}
                        id={`delete-booking-${bk.id}`}
                        className="absolute top-2.5 left-2.5 text-[10px] text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer focus:outline-none pointer-events-auto"
                        title="إزالة هذا المسار"
                      >
                        إزالة
                      </button>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-purple-300 bg-purple-500/15 py-0.5 px-2 rounded-md font-semibold">
                          {bk.eventType}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {bk.timestamp}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-white mb-1">
                        تاريخ المناسبة: <span className="text-yellow-400">{bk.eventDate}</span>
                      </h5>
                      
                      <p className="text-gray-400 font-light text-[11px] mb-2 leading-tight">
                        العميل: {bk.name} • {bk.city}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-yellow-400/90 bg-yellow-400/5 py-0.5 px-2 rounded border border-yellow-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                          قيد الاتصال السريع والتنسيق
                        </span>
                        
                        <button
                          onClick={() => {
                            const whatsappURL = `https://wa.me/212618407049?text=${encodeURIComponent(formatWhatsAppText(bk))}`;
                            window.open(whatsappURL, '_blank');
                          }}
                          id={`retry-whatsapp-bk-${bk.id}`}
                          className="text-[10.5px] text-green-400 hover:underline font-bold pointer-events-auto cursor-pointer"
                        >
                          تذكير عبر واتساب
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
