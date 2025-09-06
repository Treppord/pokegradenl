/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.pokegrade.nl',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Font optimization is handled by next/font automatically
}

module.exports = nextConfig
