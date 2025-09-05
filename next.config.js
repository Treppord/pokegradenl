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
}

module.exports = nextConfig
