import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Keep Inter as a fallback if needed
import localFont from 'next/font/local';
import "../styles/globals.css";
import { cn } from "@/lib/utils"; // Import the cn utility

// Import Header and Footer
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Load Greycliff CF font from local files (adjust paths as needed)
const fontGreycliff = localFont({
  src: [
    { path: '../public/fonts/GreycliffCF-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/GreycliffCF-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/GreycliffCF-Bold.otf', weight: '700', style: 'normal' },
    // Add other weights/styles if available
  ],
  variable: '--font-greycliff', // Define CSS variable name
  display: 'swap', 
});

// Example using Inter as a fallback or secondary font if desired
const fontSans = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" // Optional: define another variable if needed
});

export const metadata: Metadata = {
  title: "Maitai", // Default title, will be customized by next-seo
  description: "AI-Powered Security", // Default description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head /> 
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased", // Use font-sans from tailwind config
          fontGreycliff.variable, // Apply Greycliff variable
          fontSans.variable // Optional: Apply Inter variable if used
        )}
      >
        <Header />
        <main id="main" className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
} 