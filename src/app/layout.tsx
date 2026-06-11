import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-provider';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'MDX Next.js Blog Platform',
  description: 'A modern and performant blog platform built with Next.js and MDX.',
  keywords: ['Next.js', 'MDX', 'Blog', 'React', 'TypeScript', 'Tailwind CSS', 'Dark Mode'],
  openGraph: {
    title: 'MDX Next.js Blog Platform',
    description: 'A modern and performant blog platform built with Next.js and MDX.',
    url: 'https://your-blog-url.com',
    siteName: 'MDX Next.js Blog',
    images: [
      {
        url: 'https://your-blog-url.com/og-image.jpg', // Replace with your OG image
        width: 1200,
        height: 630,
        alt: 'MDX Next.js Blog Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MDX Next.js Blog Platform',
    description: 'A modern and performant blog platform built with Next.js and MDX.',
    creator: '@your_twitter_handle', // Replace with your Twitter handle
    images: ['https://your-blog-url.com/twitter-image.jpg'], // Replace with your Twitter image
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 sticky top-0 z-10">
              <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  MDX Blog
                </Link>
                <div className="flex items-center space-x-4">
                  <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Home
                  </Link>
                  <ThemeToggle />
                </div>
              </nav>
            </header>
            <main className="flex-grow container mx-auto p-4 md:py-8">
              {children}
            </main>
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 mt-8">
              <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} MDX Next.js Blog. All rights reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
