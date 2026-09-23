import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/departments/pathfinders-adventurers",
        destination: "/departments/pathfinders",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;