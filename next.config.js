
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
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    })
    return config
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

