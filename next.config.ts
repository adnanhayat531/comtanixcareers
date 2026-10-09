import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN IP access in `next dev` (CSS/JS otherwise return 403)
  allowedDevOrigins: ["192.168.205.85", "192.168.60.176", "127.0.0.1", "localhost"],
  images: {
    qualities: [75, 92, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
