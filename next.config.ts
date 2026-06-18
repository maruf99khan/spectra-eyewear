import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  logging: {
    fetches: { fullUrl: false },
  },
};

export default nextConfig;
