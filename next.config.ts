import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Project and certification imagery still lives where the previous
    // portfolio published it. Only those two hosts are allowed.
    remotePatterns: [
      { protocol: "https", hostname: "www.dropbox.com" },
      { protocol: "https", hostname: "dl.dropboxusercontent.com" },
      { protocol: "https", hostname: "images.credly.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
