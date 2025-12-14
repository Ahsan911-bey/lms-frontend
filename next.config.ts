import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pyxis.nymag.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "swl-cms.comsats.edu.pk",
        port: "8082",
      },
    ],
  },
};

export default nextConfig;
