import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/dashboard/:path*",
        destination: "http://localhost:5137/api/dashboard/:path*",
      },
      {
        source: "/api/replay/:path*",
        destination: "http://localhost:5137/api/replay/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:5137/api/auth/:path*",
      },
      {
        source: "/api/stripe/:path*",
        destination: "http://localhost:5137/api/stripe/:path*",
      },
      {
        source: "/v1/:path*",
        destination: "http://localhost:5137/v1/:path*",
      },
    ];
  },
};

export default nextConfig;