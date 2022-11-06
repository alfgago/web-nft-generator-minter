
require("dotenv").config()
const path = require('path')


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { esmExternals: true },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
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

