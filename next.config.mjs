/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Next resizes + serves modern formats (AVIF/WebP) on demand. The source
    // PNGs in /public are multi-MB; this cuts them to a fraction on the wire.
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
