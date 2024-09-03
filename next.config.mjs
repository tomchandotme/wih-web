/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/": ["./node_modules/warframe-items/data/**/*"],
    "/owned": ["./node_modules/warframe-items/data/**/*"],
    "/wishlisted": ["./node_modules/warframe-items/data/**/*"],
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
