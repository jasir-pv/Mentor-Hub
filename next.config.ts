// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['localhost'], // Add your image domains here
  },
}

module.exports = nextConfig