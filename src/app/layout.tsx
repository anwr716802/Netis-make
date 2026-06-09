// src/app/layout.tsx

import './globals.css';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '600', '700', '900'],
  variable: '--font-cairo',
});

export const metadata = {
  title: 'محل الشعب GLOBAL',
  description: 'منصة تسوق متكاملة وسريعة لخدمة أهالي مأرب',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          body { font-family: var(--font-cairo), sans-serif; }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
