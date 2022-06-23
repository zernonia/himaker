import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "~/assets/main.css",
    "primevue/resources/themes/lara-light-teal/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],
  modules: ["nuxt-windicss", "@nuxtjs/supabase"],
})
