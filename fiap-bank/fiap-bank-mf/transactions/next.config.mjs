import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "transactions",
        filename: "static/chunks/remoteEntry.js",
    exposes: {
  "./DashboardRemote": "./remotes/DashboardRemote.tsx",
  "./TransactionsRemote": "./remotes/TransactionsRemote.tsx",
},



        shared: {},
      })
    );

    return config;
  },
};

export default nextConfig;
