/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-radiotime-logos.tunein.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn-profiles-dev.tunein.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn-web.tunein.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
