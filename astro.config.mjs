import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://1tpp.dev",
  output: "server",
  adapter: vercel(),
  integrations: [tailwind()]
});