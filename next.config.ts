import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/results',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [new URL('https://www.livesport.cz/**')],
  },
};

export default nextConfig;
