import type { NextConfig } from "next";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
        ],
      },
    ];
  },
} satisfies NextConfig;

export default nextConfig;
