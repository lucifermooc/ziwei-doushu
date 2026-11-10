import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: '紫微斗数 · 命理排盘研析系统',
  description: '基于倪海厦《天纪》三合派正宗体系，纯前端离线计算，提供十二宫排盘、三方四正连线、生年与飞星四化、古籍格局识别及原典详析。',
  keywords: '紫微斗数, 倪海厦, 天纪, 紫微命盘, 排盘系统, 14主星, 12宫位, 三方四正, 四化飞星',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ziwei-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);else document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
