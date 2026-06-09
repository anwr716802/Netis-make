'use client';

import React, { useState, useMemo } from 'react';
import { Product, getProductImageUrl, CONFIG } from '@/lib/shopConfig';

interface StoreFrontProps {
  initialProducts: Product[];
}

export default function StoreFront({ initialProducts }: StoreFrontProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('الكل');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // تصفية المنتجات بذكاء وسرعة فائقة
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (category !== 'الكل') {
      result = result.filter(p => p.القسم === category || p.النوع === category);
    }

    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p['اسم المنتج']?.toLowerCase().includes(q) || 
        p.الوصف?.toLowerCase().includes(q)
      );
    }

    if (priceFilter === 'low') {
      result = result.filter(p => parseFloat(p.السعر || '0') < 20000);
    } else if (priceFilter === 'high') {
      result = result.filter(p => parseFloat(p.السعر || '0') >= 20000);
    } else if (priceFilter === 'asc') {
      result.sort((a, b) => parseFloat(a.السعر || '0') - parseFloat(b.السعر || '0'));
    } else if (priceFilter === 'desc') {
      result.sort((a, b) => parseFloat(b.السعر || '0') - parseFloat(a.السعر || '0'));
    }

    return result;
  }, [initialProducts, category, search, priceFilter]);

  // إرسال الطلب عبر الواتساب مباشرة
  const sendWhatsAppOrder = (product: Product) => {
    const message = `السلام عليكم ورحمة الله، أريد طلب هذه القطعة من فضلك:
*اسم المنتج:* ${product['اسم المنتج']}
*القسم/النوع:* ${product.القسم} - ${product.النوع}
*السعر:* ${parseFloat(product.السعر || '0').toLocaleString()} ل.ي
رابط المتجر: ${window.location.origin}`;
    
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="shop" class="container mx-auto px-3 md:px-6 pt-6">
      {/* شريط الفلترة والبحث الـ Dynamic */}
      <div class="bg-white p-3 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div class="relative md:col-span-2">
            <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-9 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition" 
              placeholder="ابحث باسم القطعة أو الموديل..."
            />
          </div>
          <div>
            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition text-gray-600 font-medium"
            >
              <option value="all">كل الأسعار</option>
              <option value="low">الأسعار الأقل من 20,000 ل.ي</option>
              <option value="high">الأسعار الأعلى من 20,000 ل.ي</option>
              <option value="asc">ترتيب: من الأقل إلى الأعلى</option>
              <option value="desc">ترتيب: من الأعلى إلى الأقل</option>
            </select>
          </div>
        </div>
        
        {/* أزرار الأقسام المتوافقة مع سحب الجوال (Scrollable) */}
        <div class="flex items-center gap-2 border-t border-gray-50 pt-2.5 overflow-x-auto no-scrollbar">
          {['الكل', 'رجالي', 'نسائي', 'ملابس', 'إكسسوارات'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                category === cat ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* شبكة المنتجات المستجيبة للجوال (3 أعمدة في الشاشات الصغيرة جداً وبدقة متناهية) */}
      <div class="my-8">
        {filteredProducts.length === 0 ? (
          <div class="text-center py-16">
            <i class="fa-regular fa-face-frown text-4xl text-gray-300 mb-2 block"></i>
            <p class="text-gray-400 text-sm">عذراً، لم نجد أي قطع تطابق بحثك الحالي.</p>
          </div>
        ) : (
          <div class="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
            {filteredProducts.map((product) => {
              const mainImg = getProductImageUrl(product['الصورة 1'] || product['الصورة']);
              return (
                <div 
                  key={product.ID}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 cursor-pointer flex flex-col relative"
                >
                  <div class="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden">
                    <img src={mainImg} alt={product['اسم المنتج']} className="w-full h-full object-cover" loading="lazy" />
                    <span class="absolute top-1.5 right-1.5 bg-black/80 text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {product.القسم}
                    </span>
                  </div>
                  <div class="p-2 md:p-4 flex flex-col flex-grow text-right">
                    <span class="text-[8px] md:text-[10px] text-indigo-600 font-bold uppercase mb-0.5">{product.النوع}</span>
                    <h3 class="text-xs md:text-sm font-bold text-neutral-900 mb-1 line-clamp-1">{product['اسم المنتج']}</h3>
                    <div class="flex justify-between items-center pt-2 border-t border-gray-50 mt-auto">
                      <span class="text-xs md:text-base font-black text-neutral-900">
                        {parseFloat(product.Sعر || product.السعر || '0').toLocaleString()} <span class="text-[8px] md:text-xs text-gray-500">ل.ي</span>
                      </span>
                      <span class="text-[8px] md:text-[10px] text-indigo-500 font-bold bg-indigo-50 px-1.5 py-0.5 rounded hidden sm:inline">
                        تفاصيل ←
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* مودال تفاصيل المنتج السريع والمحسن كلياً */}
      {selectedProduct && (
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 transition-opacity">
          <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row text-right">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 left-3 bg-black/50 hover:bg-black text-white w-7 h-7 rounded-full flex items-center justify-center transition z-10"
            >
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            
            <div class="w-full md:w-1/2 aspect-[3/4] bg-neutral-100 relative">
              <img 
                src={getProductImageUrl(selectedProduct['الصورة 1'] || selectedProduct['الصورة'])} 
                alt={selectedProduct['اسم المنتج']} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div class="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
              <div>
                <span class="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                  {selectedProduct.القسم} | {selectedProduct.النوع}
                </span>
                <h2 class="text-lg md:text-xl font-black text-neutral-900 mb-1.5">{selectedProduct['اسم المنتج']}</h2>
                <div class="text-xl font-black text-neutral-900 mb-3">
                  {parseFloat(selectedProduct.السعر || '0').toLocaleString()} <span class="text-xs font-normal text-gray-500">ريال يمني</span>
                </div>
                <p class="text-[11px] text-gray-400 font-bold mb-1">تفاصيل المنتج:</p>
                <p class="text-xs md:text-sm text-gray-600 leading-relaxed font-light mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {selectedProduct.الوصف || 'لا توجد تفاصيل إضافية متاحة لهذه القطعة حالياً.'}
                </p>
              </div>
              <button 
                onClick={() => sendWhatsAppOrder(selectedProduct)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-md"
              >
                <i class="fa-brands fa-whatsapp text-lg"></i>
                <span>اطلب وتواصل عبر واتساب</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
                                  }
                                                                                                                   
