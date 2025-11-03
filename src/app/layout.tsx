import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Favicon from '/public/images/favicon.ico';
import { AuthProvider } from '@/components/providers/auth-provider';
import { QueryProvider } from '@/components/providers/query-provider';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'CardShare App',
  description:
    'CardShare is a modern platform for creating, sharing, and discovering digital cards. Design beautiful cards, connect with others, and explore a vibrant community.',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <AuthProvider />
          <Toaster position="top-right" closeButton richColors expand />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
