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
};

export default nextConfig;
