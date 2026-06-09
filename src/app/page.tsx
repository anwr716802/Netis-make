// src/app/page.tsx

import { getProducts } from '@/lib/shopConfig';
import StoreFront from '@/components/StoreFront';
import Script from 'next/script';

// إعدادات الـ SEO الفائقة والمخصصة لمدينة مأرب واليمن
export const metadata = {
  title: 'محل الشعب | المنصة العالمية للموضة في مأرب',
  description: 'تصفح أحدث صيحات الموضة العالمية والملابس الفخمة بمأرب عبر متجر محل الشعب. خدمات توصيل سريعة وتشكيلات رجالية ونسائية راقية.',
  openGraph: {
    title: 'محل الشعب GLOBAL - أناقتك بلمسة ذكية بمأرب',
    description: 'اكتشف تشكيلتنا الفخمة من الملابس والإكسسوارات. تسوق مباشرة وتواصل معنا بنقرة زر واحدة عبر متجرنا السحابي السريع.',
    url: 'https://pop-tau-flame.vercel.app/',
    images: [
      {
        url: 'https://sparkon-alsheb.netlify.app/alsheb2.png',
        width: 1200,
        height: 630,
        alt: 'محل الشعب جوبال',
      },
    ],
    type: 'website',
  },
};

export default async function HomePage() {
  // جلب المنتجات مباشرة في السيرفر أثناء بناء الصفحة (Server-Side)
  const products = await getProducts();

  return (
    <div class="bg-gray-50 text-gray-900 antialiased overflow-x-hidden" dir="rtl">
      {/* تضمين أيقونات FontAwesome والأنيميشن بدون التأثير على سرعة التحميل */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

      {/* الشريط العلوي الإعلاني */}
      <div class="bg-black text-white text-center py-1.5 text-[10px] md:text-xs font-semibold tracking-wide px-4">
        <a href="https://sparkon-alsheb.netlify.app/" target="_blank" rel="noopener noreferrer">
          <span>هذا الموقع برعاية مؤسسة الشعب للمقاولات العامة - مأرب</span> 
        </a>
      </div>

      {/* الهيدر / شريط التنقل المتنقل الذكي */}
      <nav class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div class="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          <a href="#" class="text-xl md:text-2xl font-black text-neutral-900 tracking-wide flex items-center gap-1.5">
            <span class="bg-black text-white px-2 py-0.5 rounded text-sm md:text-xl">
              <i class="fa-solid fa-bag-shopping"></i>
            </span>
            <span>محل الشعب<span class="text-indigo-600 text-[10px] font-bold mr-1">GLOBAL</span></span>
          </a>
          <div class="hidden md:flex gap-8 font-medium text-sm text-gray-600">
            <a href="#offers" class="hover:text-red-500 transition">أقوى العروض 🔥</a>
            <a href="#shop" class="hover:text-black transition">كل المنتجات</a>
          </div>
          <div>
            <a href="https://wa.me/967737207420" target="_blank" rel="noopener noreferrer" class="bg-emerald-500 hover:bg-emerald-600 text-white p-2 md:px-4 md:py-2 rounded-full text-xs font-bold flex items-center gap-2 transition shadow-sm">
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span class="hidden md:inline">خدمة العملاء</span>
            </a>
          </div>
        </div>
      </nav>

      {/* قسم البانر الترحيبي البطل (Hero Section) */}
      <section id="offers" class="relative bg-neutral-900 text-white overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center">
        <div class="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200')" }}></div>
        <div class="absolute inset-0 bg-gradient-to-l from-black via-black/75 to-transparent"></div>
        <div class="container mx-auto px-4 md:px-6 relative z-10 py-12 text-right">
          <span class="bg-red-600 text-white text-[9px] md:text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase mb-3 inline-block animate-pulse">خصومات تصل إلى 50%</span>
          <h1 class="text-2xl md:text-5xl font-black mb-3 leading-tight max-w-xl">أناقتك العالمية بلمسة محلية ذكية بمأرب</h1>
          <p class="text-gray-300 max-w-md text-xs md:text-base mb-5 font-light">تصفح أحدث صيحات الموضة المرفوعة مباشرة من صالة العرض السحابية الفاخرة.</p>
          <a href="#shop" class="bg-white hover:bg-gray-100 text-black px-5 py-2.5 md:px-7 md:py-3.5 rounded-full font-bold text-xs md:text-sm tracking-wide shadow-lg transition inline-block">تسوق التشكيلة الآن</a>
        </div>
      </section>

      {/* المكون السحري للمتجر وفلترة المنتجات الحية */}
      <StoreFront initialProducts={products} />

      {/* الفوتر الهندسي الاحترافي */}
      <footer class="bg-neutral-900 text-gray-400 pt-12 pb-6 border-t border-neutral-800 mt-16">
        <div class="container mx-auto px-4 md:px-6 text-center">
          <div class="mb-4">
            <i class="fa-solid fa-code text-2xl text-indigo-500 mb-1.5 block"></i>
            <h3 class="text-white text-base font-bold">التميز الهندسي والبرمجي المتكامل</h3>
          </div>
          
          <p class="text-xs max-w-xl mx-auto leading-relaxed mb-6 font-light text-gray-300">
            تم إعادة بناء وتأمين هذا المتجر بالكامل بهيكل Next.js السريع لضمان تصدر محركات البحث (SEO) واستقرار الأداء بأقل سرعات إنترنت ممكنة.
          </p>
          
          <div class="border-t border-neutral-800 pt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px]">
            <p class="text-gray-500">جميع الحقوق محفوظة لموقع محل الشعب © 2026</p>
            <p class="text-gray-400">
              حقوق النشر لـ: <a href="https://sparkon-alsheb.netlify.app/" target="_blank" rel="noopener noreferrer" class="text-indigo-400 font-bold hover:underline">مؤسسة الشعب للمقاولات العامة - مأرب</a>
            </p>
            <p class="text-gray-500">
              تطوير: <span class="text-white font-semibold">الفريق البرمجي لدى المؤسسة</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

