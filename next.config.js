/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  // Remove the invalid experimental.fontLoaders option
  // Next.js now has built-in font optimization that works automatically
};

module.exports = nextConfig;