import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { languageCodes } from "./src/i18n/config";
import sitemap from "@astrojs/sitemap";
console.log("languageCodes:",languageCodes)
export default defineConfig({
  i18n: {
    locales:  languageCodes,
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true, 
    },
  }, 
 
  integrations: [react(), sitemap()], 
  vite: {
    plugins: [tailwindcss()]
  }
})