import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Check, Info } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'ما هي المدن التي تغطيها عروض ديجي عماد آيت الحسن؟',
    answer: 'مقرنا الأساسي في أكادير / أولاد تايمة، ولكننا نغطي جميع ربوع المملكة المغربية (أكادير، أولاد تايمة، الدار البيضاء، الرباط، طنجة، فاس...)، وننتقل بكافة المعدات والأنظمة الصوتية والضوئية المتقدمة لتقديم نفس الجودة الاستثنائية أينما كنتم.'
  },
  {
    question: 'ما هي باقات الخدمات المتوفرة وكيف يتم احتساب الأسعار؟',
    answer: 'نوفر باقات مرنة ومتنوعة تناسب حجم الحفل وميزانيتكم (باقة فضية للأفراح المصغرة، باقة ذهبية للأفراح المتوسطة، وباقة ملكية للأعراس الفاخرة والمهرجانات). يعتمد الثمن على تاريخ المناسبة، المدينة، ونوع المؤثرات المطلوبة (مثل كميات الدخان الثقيل، ليزر المهرجانات، والشهب النارية الباردة). يرجى الاتصال بنا هاتفياً للاستشارة وتحديد السعر المخصص.'
  },
  {
    question: 'هل يمكنني تنسيق واختيار لائحة الأغاني والموسيقى المفضلة مسبقاً؟',
    answer: 'بالتأكيد! نعقد جلسة تنسيق هاتفية أو مباشرة قبل المناسبة بأسبوعين على الأقل للاتفاق على تيم الموسيقى المفضل، وتحديد التفاصيل الدقيقة مثل أغنية دخول العروسين (العمارية)، لحظة تبادل الخواتم، أغنيات دورة المائدة، ولحظة تقطيع الكعكة، بالإضافة لجمع الأغاني الخاصة بعائلتكم لتفادي أي عشوائية.'
  },
  {
    question: 'هل تتناسق عروض ديجي عماد مع النكافات والفرق الشعبية الحاضرة؟',
    answer: 'نعم، التنسيق هو سر نجاح أي حفل مغربي. ديجي عماد يمتاز بخبرة شاسعة في الاندماج والتعاون التام مع النكافات المعتمدات ومسيري القاعة والفرق الشعبية كالدقة المراكشية، عيساوة، كناوة، والمجموعات العصرية. نضمن عدم حدوث أي تداخل صوتي أو ارتباك في التوقيت.'
  },
  {
    question: 'كيف نضمن حجز موعد الحفلة بشكل رسمي وقانوني؟',
    answer: 'بعد الاتفاق الأولي وتحديد الباقة الملائمة، نبرم عقد الاتفاق الرسمي والمسجل الذي يوثق كافة الالتزامات (الموعد بضبط الساعات، الباقة المحددة، ومؤثرات الدخان والتبوريدة المتفق عليها) مع دفع تسبيق تأكيدي بسيط (العربون). هذا يضمن حجز الموعد لكم بالكامل ويوفر الأمان والراحة للطرفين.'
  },
  {
    question: 'هل نوفر مؤثرات الدخان والتبوريدة بشكل مستقل وآمن تماماً للحضور والقاعة؟',
    answer: 'نعم، نستخدم حصرياً أحدث معدات الحفلات التخصصية الخاضعة لمعايير السلامة العالمية. نافورات النار الباردة (Sparklers) لا تسبب حروقاً وهي آمنة للأطفال والملابس، وآلات الدخان الثقيل (Heavy Fog) تعتمد على تبريد بخار الماء النظيف بحيث لا تترك روائحاً ولا تفجر أجهزة إنذار الحرائق بالقاعة.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background static design features */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium text-sm mb-4">
            أسئلة وإجابات توضيحية
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">
            كل ما تحب معرفته <span className="text-yellow-400">قبل الحجز</span>
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed">
            لقد لخصنا أهم الأسئلة التي تشغل تفكير العرسان ومنظمي الحفلات للإجابة عليها بأعلى درجات الوضوح والشفافية.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all duration-300"
                style={{
                  boxShadow: isOpen ? '0 4px 25px -5px rgba(168, 85, 247, 0.15)' : 'none'
                }}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleOpen(index)}
                  id={`faq-trigger-${index}`}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-right cursor-pointer focus:outline-none focus:bg-white/5 transition-colors pointer-events-auto"
                >
                  <div className="flex items-center gap-3.5 pl-4">
                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm shrink-0">
                      ؟
                    </span>
                    <h4 className="font-bold text-white text-sm md:text-base leading-snug">
                      {item.question}
                    </h4>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-yellow-500' : ''}`} />
                </button>

                {/* Answer Area */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-black/20 border-t border-white/5"
                    >
                      <div className="p-6 text-gray-300 font-light text-xs md:text-sm leading-relaxed text-right">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* FAQ Visual Advice Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/25 flex items-start gap-4"
        >
          <Info className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-yellow-200/90 leading-relaxed font-light">
            <strong>نصيحة ذهبية من ديجي عماد:</strong> فترة الصيف (من مايو إلى سبتمبر) وفترة عطل نهاية السنة تشهد ضغطاً هائلاً على الحجوزات بالمغرب. ننصحكم بتأكيد حجز ديجي الحفل قبل مناسبتكم بـ <strong>3 إلى 6 أشهر</strong> لحفظ تيم ليلتكم وضمان التوافر بالكامل.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
