require("dotenv").config()
const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
      "gateway.pinata.cloud",
      "plusone-public.s3.amazonaws.com",
      "plusone-frontend.vercel.app",
      "cf-ipfs.com",
      "plusonemusic.io",
      "localhost",
      "ipfs.io",
      "staging.plusonemusic.io",
      "akns-images.eonline.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: process.env.NEXT_PUBLIC_STRAPI_URL + "/uploads/:path*", // Proxy to Backend
      },
      {
        source: "/aws/:path*",
        destination: "https://plusone-public.s3.amazonaws.com/:path*", // Proxy to S3
      },
      {
        source: "/ipfs/:path*",
        destination: "https://gateway.pinata.cloud/ipfs/:path*", // Proxy to S3
      },
    ]
  },
}

module.exports = nextConfig
