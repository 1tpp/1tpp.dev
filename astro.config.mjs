import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://1tpp.dev",
  output: "server",
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      customPages: [`https://1tpp.dev/`, `https://1tpp.dev/about`],
    }),
  ],
});