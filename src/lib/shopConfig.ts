// src/lib/shopConfig.ts

export const CONFIG = {
  spreadsheetId: '1siyS5wYgZ67HfdFx98127dmcNiUDLNuAAhZ15PC7raQ',
  appId: 'fff81242-afbe-4e49-aa96-5ba09e74b131',
  tableName: 'المنتجات',
  whatsappNumber: '967737207420'
};

export interface Product {
  ID: string;
  'اسم المنتج': string;
  القسم: string; // رجالي، نسائي...
  النوع: string; // ملابس، إكسسوارات...
  السعر: string;
  الوصف: string;
  الحالة: string; // متوفر، غير متوفر
  'الصورة 1'?: string;
  الصورة?: string;
  'الصورة 2'?: string;
  'الصورة 3'?: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/export?format=csv&id=${CONFIG.spreadsheetId}`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // تحديث تلقائي كل ساعة للـ SEO
    if (!response.ok) throw new Error('فشل جلب البيانات من Google Sheets');
    
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function parseCSV(text: string): Product[] {
  const lines = text.split('\n');
  if (lines.length === 0 || !lines[0]) return [];
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/[\r\n"]/g, ""));
  const list: Product[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // تقسيم السطر مع مراعاة الفواصل داخل علامات التنصيص
    const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^()]*$)/);
    const obj: any = {};
    
    for (let j = 0; j < headers.length; j++) {
      let val = currentline[j] ? currentline[j].trim() : "";
      val = val.replace(/^"|"$/g, "").replace(/[\r\n]/g, "");
      obj[headers[j]] = val;
    }
    list.push(obj as Product);
  }
  return list.filter(p => p.الحالة === 'متوفر');
}

export function getProductImageUrl(imgName: string | undefined): string {
  if (!imgName) return 'https://via.placeholder.com/600x600?text=No+Image';
  if (imgName.startsWith('http')) return imgName;
  return `https://www.appsheet.com/template/gettablefileurl?appName=${CONFIG.appId}&tableName=${encodeURIComponent(CONFIG.tableName)}&fileName=${encodeURIComponent(imgName)}`;
}
