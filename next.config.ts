import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-fc83f3cd6db94e62b59d4ec345ce8ffe.r2.dev',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: 'https://blog.elitestaysafrica.com/',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: 'https://blog.elitestaysafrica.com/:path*',
        permanent: true,
      },
      {
        source: '/investors',
        destination: '/invest',
        permanent: true,
      },
      {
        source: '/thankyou',
        destination: '/properties',
        permanent: false, // temporary until reward page is built
      },
      {
        source: '/tiktok',
        destination: '/start',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
