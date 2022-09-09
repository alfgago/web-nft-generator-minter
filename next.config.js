/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { esmExternals: true },
  images: {
    domains: ['rubberbullets.longlead-dev.decimalstudios.com'],
  },
}

module.exports = nextConfig

