import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { languageCodes } from "./src/i18n/config";
console.log("languageCodes:",languageCodes)
export default defineConfig({
  i18n: {
    locales:  languageCodes,
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true, 
    },
  }, 
 
  integrations: [react()], 
  vite: {
    plugins: [tailwindcss()]
  }
})