import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'ethers/lib/utils': path.resolve(__dirname, 'lib/ethers-v5-shim.mjs'),
    };
    return config;
  },
};

export default nextConfig;
