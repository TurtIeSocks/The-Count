// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV !== 'production',
  swcMinify: true,
  env: {},
  poweredByHeader: false,
};

export default nextConfig;
