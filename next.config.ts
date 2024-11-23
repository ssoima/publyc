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
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // Use `true` for 308 permanent redirect
            },
        ];
    },
};

export default nextConfig;
