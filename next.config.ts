import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogger-wph-api-production.up.railway.app",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
