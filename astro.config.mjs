import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { languageCodes } from "./src/i18n/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
// https://astro.build/config
export default defineConfig({
  site: "https://rubito.jp",
  base: "/",
  trailingSlash: "ignore",
  output: "server",
  vite: {
    resolve: {
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
  prefetch: {
    prefetchAll: true,
  },

  i18n: {
    locales: languageCodes,
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],

  adapter: cloudflare(),
});
