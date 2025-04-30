import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import "../styles/globals.css";
import { cn } from "@/lib/utils";

// Import Header and Footer
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IntercomSetup } from "@/components/IntercomSetup";
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: 'Maitai — AI Infrastructure that Heals Itself',
  description: 'Resilient AI infrastructure that automatically adapts, recovers, and optimizes itself in real-time.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' }, // Link for .ico
      { url: '/favicon.svg', type: 'image/svg+xml' }, // Link for .svg
    ],
    // Optionally add apple-touch-icon, shortcut icon etc. here
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head /> 
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased", // font-sans will be defined in Tailwind config
        )}
      >
        <Header />
        <main id="main" className="pt-16">{children}</main>
        <Footer />
        <IntercomSetup />
        <Toaster />
      </body>
    </html>
  );
} 