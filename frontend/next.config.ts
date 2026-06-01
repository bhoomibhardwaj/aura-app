import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.104', 'localhost', '*.local-origin.dev'],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
