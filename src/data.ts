import { ServiceItem, TestimonialItem, GalleryItem, StatItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    arabicTitle: 'حفلات الأعراس المغربية',
    description: 'إدخال البهجة والسرور لليلة العمر مع دمج الأصالة المغربية باللمسة العصرية.',
    iconName: 'Sparkles',
    tag: 'الأكثر طلباً',
    glowColor: 'rgba(234, 179, 8, 0.35)', // Gold
    borderColor: 'border-yellow-500/30',
    details: [
      'تنشيط مخصص للمراحل التقليدية (العمارية، دورة المائدة، البرزة)',
      'تنسيق متكامل مع النكافات والدقة المراكشية والفرق الشعبية',
      'مزيج موسيقي متناغم يرضي جميع الأذواق والأجيال',
      'موسيقى ترحيبية راقية تليق بمستوى ضيوفكم الكرام'
    ]
  },
  {
    id: 'engagements',
    title: 'Engagements',
    arabicTitle: 'حفلات الخطوبة',
    description: 'أجواء عائلية حميمية وتنشيط راقٍ لتخليد خطوتكم الأولى نحو القفص الذهبي.',
    iconName: 'Heart',
    tag: 'حميمية ورومانسية',
    glowColor: 'rgba(236, 72, 153, 0.35)', // Pink/Red
    borderColor: 'border-pink-500/30',
    details: [
      'موسيقى رومانسية دافئة تلائم لحظة تبادل الخواتم',
      'تنشيط تفاعلي خفيف يحافظ على وقار ودفء العائلة',
      'أحدث الأغاني العصرية المصممة لبهجة هذا اليوم'
    ]
  },
  {
    id: 'birthdays',
    title: 'Birthdays',
    arabicTitle: 'أعياد الميلاد الخاصة',
    description: 'احتفال استثنائي مليء بالحيوية والطاقة والجنون الموسيقي لميلاد لا يُنسى.',
    iconName: 'Cake',
    tag: 'طاقة وحيوية',
    glowColor: 'rgba(59, 130, 246, 0.35)', // Blue
    borderColor: 'border-blue-500/25',
    details: [
      'مزج شبابي حماسي لأحدث الأغاني العالمية والمحلية',
      'برنامج مخصص للحظة إطفاء الشموع مع مؤثرات صوتية',
      'تحديات راقصة وأجواء مفعمة بالمرح لكل المدعوين'
    ]
  },
  {
    id: 'lighting',
    title: 'Professional Lighting',
    arabicTitle: 'هندسة الإضاءة والمؤثرات',
    description: 'تحويل قاعة الحفل إلى لوحة فنية ساحرة بتقنيات إضاءة ديناميكية تفاعلية.',
    iconName: 'Tv',
    tag: 'احترافية كاملة',
    glowColor: 'rgba(168, 85, 247, 0.35)', // Purple
    borderColor: 'border-purple-500/30',
    details: [
      'إضاءة ذكية تفاعلية بالكامل مع إيقاع الموسيقى (Moving Heads)',
      'إضاءة معمارية جدارية بألوان تلائم تيم الحفل المختار',
      'ليزر ثلاثي الأبعاد لخطوط بصرية مذهلة تحاكي المهرجانات'
    ]
  },
  {
    id: 'effects',
    title: 'Smoke & Tbourida',
    arabicTitle: 'مؤثرات الدخان والتبوريدة',
    description: 'إضافة لمسة درامية وسحرية للحظات الاستثنائية بفضل الدخان الكثيف والنار الباردة.',
    iconName: 'Flame',
    tag: 'تأثير سينمائي',
    glowColor: 'rgba(239, 68, 68, 0.35)', // Red
    borderColor: 'border-red-500/30',
    details: [
      'دخان كثيف أرضي (Heavy Fog) لخلق تأثير السير فوق السحاب للعرسان',
      'نافورات النار الباردة الآمنة (Sparklers) للحظات الذروة',
      'مؤثرات التبوريدة والشهب النارية لإشعال حماس القاعة بسلامة تامة'
    ]
  },
  {
    id: 'sound',
    title: 'High-end Sound System',
    arabicTitle: 'أنظمة صوتية متكاملة',
    description: 'نقاوة صوت مطلقة وارتداد مدروس يضمن تجربة بصرية وسمعية غامرة وجذابة.',
    iconName: 'Music',
    tag: 'صوت مذهل',
    glowColor: 'rgba(16, 185, 129, 0.35)', // Emerald
    borderColor: 'border-emerald-500/25',
    details: [
      'أحدث مكبرات الصوت العالمية من ماركات رائدة مجهزة بنظام تحكم ذكي',
      'مهندس صوت محترف لتنظيم مستويات الديسيبل لجمهور متاح ومستمتع بالكامل',
      'ميكروفونات لاسلكية فائقة الجودة لسلامة الكلمات والخطب العائلية'
    ]
  },
  {
    id: 'private',
    title: 'Private Events',
    arabicTitle: 'المناسبات الخاصة والمؤسسات',
    description: 'خدمات راقية مصممة للشركات، حفلات التخرج، والمعارض الكبرى والافتتاحات.',
    iconName: 'Shield',
    tag: 'أناقة رسمية',
    glowColor: 'rgba(249, 115, 22, 0.35)', // Orange
    borderColor: 'border-orange-500/25',
    details: [
      'موسيقى خلفية (Lounge / Deep House) ملائمة لجلسات تبادل العلاقات والشبكات',
      'إضاءة هادئة تدعم الهوية البصرية للجهة المنظمة',
      'تنظيم الجدول الزمني بدقة متناهية مع منشط الحفل'
    ]
  },
  {
    id: 'festivals',
    title: 'Festivals',
    arabicTitle: 'المهرجانات والحفلات العامة',
    description: 'إشعال مدرجات المهرجانات والحفلات العامة في الهواء الطلق بأقوى الإيقاعات.',
    iconName: 'Zap',
    tag: 'حشود ضخمة',
    glowColor: 'rgba(6, 182, 212, 0.35)', // Cyan
    borderColor: 'border-cyan-500/25',
    details: [
      'برنامج موسيقي متفجر يدفع آلاف الحضور للتفاعل والتناغم المستمر',
      'قدرة عالية على توجيه انتباه الجماهير وتنشيط المنصات الكبرى',
      'تكامل تام مع شاشات العرض العملاقة لتقديم عروض بصرية مدمجة'
    ]
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't1',
    name: 'أنس ويسرى العلوي',
    location: 'أولاد تايمة',
    rating: 5,
    review: 'أفضل قرار اتخذناه ليلة زفافنا هو اختيار ديجي عماد! لقد جعل القاعة تهتز بالحماس والبهجة من البداية وحتى الصباح. تنشيطه مع النكافة والدقة المراكشية كان منسجماً بشكل لا يعقل، وخدمة الدخان مع رقصتنا الأولى جعلتنا نشعر وكأننا في حلم.',
    eventType: 'حفل زفاف فاخر',
    date: 'أبريل 2026'
  },
  {
    id: 't2',
    name: 'سارة التازي',
    location: 'فاس / الرباط',
    rating: 5,
    review: 'تعاملنا مع عماد في عيد ميلاد ابنتي الثامن عشر وفي مناسبة خاصة للمؤسسة. مرونته وموسوعته الموسيقية مذهلة حقاً! يعرف تماماً متى يرفع الإيقاع ومتى يهدئه. الإضاءة التي أحضرها معه غيرت مظهر القاعة بالكامل.',
    eventType: 'عيد ميلاد ومناسبة خاصة',
    date: 'مايو 2026'
  },
  {
    id: 't3',
    name: 'ياسين بلمعلم',
    location: 'أكادير / أولاد تايمة',
    rating: 5,
    review: 'التبوريدة والمؤثرات الضوئية والدخان والشهب النارية كانت خرافية! في حفل زفاف أخي كان الحضور مشدوهاً بدقة توقيت المؤثرات لدرجة مذهلة. ديجي عماد ليس مجرد منسق أغاني، بل هو مهندس لبهجة الحفلة بأكملها ونوصي به بشدة.',
    eventType: 'حفل زفاف ونظام إضاءة',
    date: 'مارس 2026'
  },
  {
    id: 't4',
    name: 'جميلة الناصري',
    location: 'طنجة',
    rating: 5,
    review: 'الاحترافية، الانضباط في الوقت، والمعاملة الطيبة. عماد استمع لكل رغباتنا ونظم الأغاني التي نحبها بالتفصيل. الصوت كان نقياً للغاية ومستواه مريحاً للآذان، والجميع بقي يرقص حتى اللحظة الأخيرة. شكراً جزيلاً!',
    eventType: 'حفل خطوبة مميز',
    date: 'فبراير 2026'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g-imgur-1',
    imageUrl: 'https://i.imgur.com/AflUXuv.jpeg',
    title: 'تفاعلات وأهازيج الأعراس المغربية الكبرى وتمايل الحضور مع النغمة الشعبية وعروض الليزر المشتعلة',
    category: 'wedding',
    categoryArabic: 'الأعراس',
    type: 'image',
    aspectRatio: 'aspect-video',
    likes: 844,
    views: 3820,
    tiktokUrl: 'https://www.tiktok.com/@cha3bil3aziz3'
  },
  {
    id: 'g-imgur-2',
    imageUrl: 'https://i.imgur.com/6tYbAlI.jpeg',
    title: 'المنظومة الاحترافية المتكاملة لمنصة ديجي عماد آيت الحسن وتوزيع مكبرات الصوت والهندسة الضوئية لتفجير القاعات',
    category: 'lighting',
    categoryArabic: 'الإضاءة الاحترافية',
    type: 'image',
    aspectRatio: 'aspect-video',
    likes: 928,
    views: 4120,
    tiktokUrl: 'https://www.tiktok.com/@cha3bil3aziz3'
  },
  {
    id: 'g-imgur-3',
    imageUrl: 'https://i.imgur.com/VBMEjDE.jpeg',
    title: 'حماس وصرخات الفرح المشتعلة والبهجة الحقيقية لضيوفنا الكرام في المهرجانات والحفلات العامة الفخمة',
    category: 'festival',
    categoryArabic: 'المهرجانات',
    type: 'image',
    aspectRatio: 'aspect-video',
    likes: 765,
    views: 3110,
    tiktokUrl: 'https://www.tiktok.com/@cha3bil3aziz3'
  },
  {
    id: 'g-imgur-4',
    imageUrl: 'https://i.imgur.com/BKnujUJ.jpeg',
    title: 'الأجواء الأسطورية واللحظات التاريخية مع ديجي عماد آيت الحسن المليئة بالطاقة الإيجابية والسرور',
    category: 'wedding',
    categoryArabic: 'الأعراس',
    type: 'image',
    aspectRatio: 'aspect-video',
    likes: 1042,
    views: 4980,
    tiktokUrl: 'https://www.tiktok.com/@cha3bil3aziz3'
  },
  {
    id: 'g-imgur',
    imageUrl: 'https://i.imgur.com/9H00UPy.png',
    title: 'تجهيزات منصة ديجي عماد السحرية ومؤثرات النافورات النارية الباردة وأنظمة الإضاءة الاحترافية',
    category: 'lighting',
    categoryArabic: 'الإضاءة الاحترافية',
    type: 'image',
    aspectRatio: 'aspect-video',
    likes: 588,
    views: 2450,
    tiktokUrl: 'https://www.tiktok.com/@cha3bil3aziz3'
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: 's1',
    value: 12,
    suffix: '+',
    label: 'سنوات الخبرة',
    icon: 'Award',
    description: 'من التنشيط والابتكار الموسيقي المستمر بالمغرب.'
  },
  {
    id: 's2',
    value: 850,
    suffix: '+',
    label: 'حفل ناجح',
    icon: 'Sparkles',
    description: 'أعراس، خطوبات، ومناسبات ملأناها بالفرح والرقص.'
  },
  {
    id: 's3',
    value: 25,
    suffix: '+',
    label: 'مدينة مغربية',
    icon: 'MapPin',
    description: 'زرناها وحركنا طاقاتها الموسيقية من الشمال للجنوب.'
  },
  {
    id: 's4',
    value: 100,
    suffix: '%',
    label: 'رضا الزبناء',
    icon: 'HeartHandshake',
    description: 'سعادة العروسين والحضور هي رأس مالنا الحقيقي.'
  }
];
