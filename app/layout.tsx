import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { SegmentProvider } from "@/components/providers/SegmentProvider";
import "./globals.css";

import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

const plantRegular = localFont({
  src: '../fonts/MartinaPlantijn-Regular.woff2',
  variable: '--font-plant-regular',
});

const plantItalic = localFont({
  src: '../fonts/MartinaPlantijn-Italic.woff2',
  variable: '--font-plant-italic',
});

const plantMedium = localFont({
  src: '../fonts/MartinaPlantijn-Medium.woff2',
  variable: '--font-plant-medium',
});

const plantMediumItalic = localFont({
  src: '../fonts/MartinaPlantijn-MediumItalic.woff2',
  variable: '--font-plant-medium-italic',
});

// const instrumentSerif = Instrument_Serif({
//   subsets: ['latin'],
//   weight: ['400'],
//   style: ['normal', 'italic'],
//   variable: '--font-serif',
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Design Library",
    template: '%s — Design Library',
  },
  description: 'A curated reference of design principles, elements, laws of UX, patterns, and insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${plantRegular.variable} ${plantItalic.variable} ${plantMedium.variable} ${plantMediumItalic.variable} antialiased`}>
      <body className={geistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" themes={['dark', 'light']}>
          <SegmentProvider>
            <SiteNav />
            <main className="min-h-screen">
              {children}
            </main>
            <SiteFooter />
          </SegmentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
