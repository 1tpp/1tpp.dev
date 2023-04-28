import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://1tpp.dev",
  // output: "server",
  // adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      customPages: [`https://1tpp.dev/`, `https://1tpp.dev/about`],
    }),
    compress(),
    AstroPWA({
      mode: "development",
      base: "/",
      scope: "/",
      includeAssets: ["favicon.svg"],
      registerType: "autoUpdate",
      manifest: {
        name: "Astro PWA",
        short_name: "Astro PWA",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/404",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/404$/],
      },
    }),
  ],
  vite: {
    logLevel: "info",
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
});
