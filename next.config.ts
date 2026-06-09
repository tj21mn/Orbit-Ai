import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "*.cursor.sh", "*.cursor.com"],
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
