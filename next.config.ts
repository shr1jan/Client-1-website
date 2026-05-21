import type { NextConfig } from "next";
import path from "node:path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseStoragePattern = supabaseUrl
  ? [
      new URL("/storage/v1/object/public/photos/**", supabaseUrl),
      new URL("/storage/v1/object/public/designs/**", supabaseUrl),
    ]
  : [];

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.*.*",
    "*.loca.lt",
  ],
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: supabaseStoragePattern,
  },
};

export default nextConfig;
