
require("dotenv").config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { esmExternals: true },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: process.env.API_URL + '/uploads/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig

