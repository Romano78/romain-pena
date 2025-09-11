'use client';

import { useEffect, useState } from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
// import Preloader from "@/components/Preloader";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This needs to be a client component to use hooks
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [preloaderShown, setPreloaderShown] = useState(false);


  useEffect(() => {
    setPreloaderShown(sessionStorage.getItem('preloaderShown') === 'true');
    if (preloaderShown) {
      setLoading(false);
      document.body.classList.add('ready');
      return;
    }

    setLoading(true);
    document.body.classList.add('ready');

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('preloaderShown', 'true');
            setLoading(false);
            setPreloaderShown(true);
            document.body.classList.add('ready');
          }, 250); // Delay after reaching 100% before fading out
          return 100;
        }
        return prev + 1;
      });
    }, 10); // Adjust interval for loading speed

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader progress={progress} />
          ) : (
            <main
              key="content"
            >
              <Nav />
              {children}
            </main>
          )}
        </AnimatePresence>
      </body>
    </html >
  );
}
