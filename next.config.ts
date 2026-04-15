import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.*.*",
    "*.loca.lt",
  ],
};

export default nextConfig;
