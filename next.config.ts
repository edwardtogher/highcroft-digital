import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gardensofedenlandscaping.co.uk",
      },
      {
        protocol: "https",
        hostname: "beautifulgardensonline.co.uk",
      },
    ],
  },
};

export default nextConfig;
