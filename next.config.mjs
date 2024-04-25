/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rizkyhaksono.natee.my.id",
      },
    ],
  },
}

export default nextConfig
