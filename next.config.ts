import type { NextConfig } from "next";

// Fallback to localhost for development, use API_URL in production
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/dashboard/:path*",
        destination: `${API_URL}/api/dashboard/:path*`,
      },
      {
        source: "/api/replay/:path*",
        destination: `${API_URL}/api/replay/:path*`,
      },
      {
        source: "/api/auth/:path*",
        destination: `${API_URL}/api/auth/:path*`,
      },
      {
        source: "/api/stripe/:path*",
        destination: `${API_URL}/api/stripe/:path*`,
      },
      {
        source: "/v1/:path*",
        destination: `${API_URL}/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
