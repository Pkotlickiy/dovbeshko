/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dovbeshko-lawyer.ru', 'placeholder.pics', 'images.unsplash.com'],
    unoptimized: true,
  },
  experimental: {
    // Remove invalid options
  },
  // Use serverExternalPackages at the root level
  serverExternalPackages: [],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  },
  // Add webpack configuration to increase memory limit
  webpack: (config) => {
    // Increase memory limit for the build process
    config.performance = {
      ...config.performance,
      hints: false, // Disable performance hints
    }
    
    return config
  }
}

export default nextConfig
