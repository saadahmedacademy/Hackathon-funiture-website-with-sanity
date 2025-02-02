import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Corrected hostname
        pathname: "/**", // Allow all paths
      },
    ],
  },

};

export default nextConfig;
