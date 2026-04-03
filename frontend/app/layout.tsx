import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Tumor Vision — AI Brain Tumor Detection",
    template: "%s | Tumor Vision"
  },
  description: "AI-powered brain tumor detection and classification from MRI scans. Detect Glioma, Meningioma, and Pituitary tumors with high accuracy using Azure Custom Vision AI.",
  keywords: [
    "AI brain tumor detector",
    "brain tumor detection",
    "MRI brain tumor analysis",
    "glioma detection",
    "meningioma detection",
    "pituitary tumor detection",
    "medical AI diagnosis",
    "tumor classification AI",
    "brain MRI analysis",
    "Tumor Vision",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
