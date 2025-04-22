import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const greycliff = localFont({
  src: [
    { path: '../public/fonts/Greycliff-CF-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Greycliff-CF-Regular-Oblique.otf', weight: '400', style: 'italic' },
    { path: '../public/fonts/Greycliff-CF-Light.otf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Greycliff-CF-Light-Oblique.otf', weight: '300', style: 'italic' },
    { path: '../public/fonts/Greycliff-CF-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Greycliff-CF-Medium-Oblique.otf', weight: '500', style: 'italic' },
    { path: '../public/fonts/Greycliff-CF-Demi-Bold.otf', weight: '600', style: 'normal' },
    { path: '../public/fonts/Greycliff-CF-Demi-Bold-Oblique.otf', weight: '600', style: 'italic' },
    { path: '../public/fonts/Greycliff-CF-Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/fonts/Greycliff-CF-Bold-Oblique.otf', weight: '700', style: 'italic' },
    { path: '../public/fonts/Greycliff-CF-Extra-Bold.otf', weight: '800', style: 'normal' },
    { path: '../public/fonts/Greycliff-CF-Extra-Bold-Oblique.otf', weight: '800', style: 'italic' },
    { path: '../public/fonts/Greycliff-CF-Heavy.otf', weight: '900', style: 'normal' },
    { path: '../public/fonts/Greycliff-CF-Heavy-Oblique.otf', weight: '900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-greycliff',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maitai – Enterprise AI with an Immune System",
  description: "Stop babysitting unreliable AI. Maitai provides robust, fast, and cost-effective inference with built-in observability and control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={greycliff.variable} suppressHydrationWarning={true}>
      <body
        className={`bg-maitai-mint-cream text-maitai-vampire-black ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main id="main-content" className={`flex-grow pt-16`}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
