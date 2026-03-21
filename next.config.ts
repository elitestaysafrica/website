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
        source: '/investors',
        destination: '/invest',
        permanent: true,
      },
      {
        source: '/thankyou',
        destination: '/properties',
        permanent: false, // temporary until reward page is built
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Proxy /blog requests to WordPress on VPS
        source: '/blog',
        destination: 'https://blog.elitestaysafrica.com/',
      },
      {
        // Proxy /blog/* requests to WordPress on VPS
        source: '/blog/:path*',
        destination: 'https://blog.elitestaysafrica.com/:path*',
      },
    ];
  },
};

export default nextConfig;
