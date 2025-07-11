import { defineConfig } from "astro/config";
import react from "@astrojs/react"; 
import { languageCodes } from "./src/i18n/config";
import sitemap from "@astrojs/sitemap"; 
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";  
import { languageCodes } from "./src/i18n/config";
// https://astro.build/config
export default defineConfig({
  site: "https://rubito.jp",
  base: "/",
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true
  },
   i18n: {
    locales:  languageCodes,
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [react(), sitemap(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }),  ],
   
});
