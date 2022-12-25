/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pro-crabada-photos.s3.ap-southeast-1.amazonaws.com', 'marketplace.crabada.com', 'elfinkingdom.com']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bombcrypto',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
