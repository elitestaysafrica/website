import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
