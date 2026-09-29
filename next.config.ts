import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN IP access in `next dev` (CSS/JS otherwise return 403)
  allowedDevOrigins: ["192.168.205.85"],
};

export default nextConfig;
