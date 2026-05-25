export interface ServiceItem {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  iconName: string;
  tag: string;
  details: string[];
  glowColor: string; // e.g. "rgba(168, 85, 247, 0.4)" (Purple)
  borderColor: string; // e.g. "border-purple-500/30"
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  eventType: string;
  date: string;
  avatarUrl?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'wedding' | 'party' | 'festival' | 'lighting' | 'effects';
  categoryArabic: string;
  type: 'image' | 'video';
  videoPlaceholderSymbol?: string;
  aspectRatio: 'aspect-square' | 'aspect-video' | 'aspect-[3/4]' | 'aspect-[4/3]';
  likes: number;
  views: number;
  tiktokUrl?: string;
}

export interface BookingFormInput {
  name: string;
  phone: string;
  city: string;
  eventType: string;
  eventDate: string;
  message: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  description: string;
}
