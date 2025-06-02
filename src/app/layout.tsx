import { Toaster } from '@/components/ui/sonner';
import { getURL } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const meta = {
  title: 'HaoMo Dashboard',
  description: 'Project management system for HaoMo',
  cardImage: '/og.webp',
  robots: 'follow, index',
  favicon: '/icon.ico',
  url: getURL(),
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: meta.title,
      template: `%s | ${meta.title}`,
    },
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['Vercel', 'Supabase', 'Next.js', 'Dashboard', 'HaoMo'],
    authors: [{ name: 'HaoMo', url: 'https://vercel.com/' }],
    creator: 'HaoMo',
    publisher: 'HaoMo',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@HarryChen824',
      creator: '@HarryChen824',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
