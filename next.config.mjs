// next.config.mjs
import withPWA from "next-pwa";

const withPWANextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // konfigurasi lainnya
};

// gabungkan konfigurasi
export default withPWANextConfig(nextConfig);
