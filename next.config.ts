import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "assets.vercel.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint warnings ignore karega
  },
  typescript: {
    ignoreBuildErrors: true, // TS errors ignore karega
  },
  async redirects() {
    return [
      {
        source: "/project",
        destination: "/projects",
        permanent: false,
      },
      {
        source: "/testinomials",
        destination: "/testimonials",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
