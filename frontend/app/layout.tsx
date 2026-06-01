import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura - AI Aesthetic Enhancement Platform",
  description: "Transform your photos into cinematic masterpieces while preserving your authentic identity. You, but better.",
  keywords: "AI photo enhancement, aesthetic filters, photo editing, cinematic effects, face preservation",
  openGraph: {
    title: "Aura - You, But Better",
    description: "AI-powered aesthetic enhancement that keeps you authentic",
    images: ["https://aura.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - Fixed with Next.js Script component */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}