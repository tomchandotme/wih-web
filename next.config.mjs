/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/owned": ["./node_modules/warframe-items/data/**/*"],
      "/wishlisted": ["./node_modules/warframe-items/data/**/*"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.warframestat.us",
      },
    ],
  },
}

export default nextConfig
