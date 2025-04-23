import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";

// Import Header and Footer
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IntercomSetup } from "@/components/IntercomSetup";

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
          "min-h-screen bg-background font-sans antialiased", // font-sans will be defined in Tailwind config
        )}
      >
        <Header />
        <main id="main" className="pt-16">{children}</main>
        <Footer />
        <IntercomSetup />
      </body>
    </html>
  );
} 