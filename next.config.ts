import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cdn.jsdelivr.net",
      "avatars.githubusercontent.com",
      "assets.vercel.com",
      "images.unsplash.com",
      "avatar.iran.liara.run",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint warnings ignore karega
  },
  typescript: {
    ignoreBuildErrors: true, // TS errors ignore karega
  },
};

module.exports = nextConfig;
