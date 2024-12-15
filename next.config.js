/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.webcontainer.io']
    }
  },
  // Enable dynamic routes at runtime
  async rewrites() {
    return [
      {
        source: '/dashboard/companies/:path*',
        destination: '/dashboard/companies/:path*'
      }
    ];
  }
};

module.exports = nextConfig;