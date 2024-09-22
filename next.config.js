/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode
  swcMinify: true, // Uses SWC for code minification
  experimental: {
    appDir: true, // Enables the new app directory structure
  },
};

module.exports = nextConfig;
