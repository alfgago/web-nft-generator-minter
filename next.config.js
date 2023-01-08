require("dotenv").config()
const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    })
    return config
  },
  experimental: {
    esmExternals: true,
  },
  images: {
    domains: [
      "plusone-public.s3.amazonaws.com",
      "plusone-frontend.vercel.app",
      "plusonemusic.io",
      "*.ipfs.nftstorage.link",
      "localhost",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: process.env.API_URL + "/uploads/:path*", // Proxy to Backend
      },
      {
        source: "/aws/:path*",
        destination: "https://plusone-public.s3.amazonaws.com/:path*", // Proxy to S3
      },
      {
        source: "/ipfs/:path*",
        destination: "https://:path*.ipfs.nftstorage.link", // Proxy to S3
      },
    ]
  },
}

module.exports = nextConfig
