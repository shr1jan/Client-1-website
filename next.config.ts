import type { NextConfig } from "next";

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
  images: {
    remotePatterns: supabaseStoragePattern,
  },
};

export default nextConfig;
