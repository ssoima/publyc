import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify')
        };
        return config;
    },
};

export default nextConfig;
