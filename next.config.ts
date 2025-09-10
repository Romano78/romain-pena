import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Default domains that are allowed by Next.js
    domains: [
      'localhost',
      '127.0.0.1',
      // Add your production domain here when you have one
      // 'yourdomain.com',
    ],
    // For more specific control, use remotePatterns
    remotePatterns: [
      // Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      // Common CDNs
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      // Common image hosting
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      // Development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
      },
    ],
    // Enable modern image formats (WebP, AVIF)
    formats: ['image/webp', 'image/avif'],
    // Enable device size detection for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Enable image quality optimization
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
