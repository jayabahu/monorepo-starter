import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@myapp/auth",
    "@myapp/database",
  ],
};

export default nextConfig;
