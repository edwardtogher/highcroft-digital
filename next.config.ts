import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gardensofedenlandscaping.co.uk",
      },
    ],
  },
};

export default nextConfig;
