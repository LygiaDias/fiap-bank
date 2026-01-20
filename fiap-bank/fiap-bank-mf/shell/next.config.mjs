import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          transactions:
            "transactions@http://localhost:3001/_next/static/chunks/remoteEntry.js",
        },
        shared: {},
      })
    );

    return config;
  },
};

export default nextConfig;
