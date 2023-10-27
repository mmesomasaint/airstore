import('next').NextConfig

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'istore.com.ng',
        port: '',
        pathname: '/cdn/shop/products/**',
      },
    ],
  },
}

module.exports = nextConfig