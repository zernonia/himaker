import { defineNuxtConfig } from "nuxt"
import { fileURLToPath } from "url"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: { interface: fileURLToPath(new URL("./utils/interface", import.meta.url)) },
  css: ["~/assets/main.css"],
  modules: ["nuxt-windicss", "@nuxtjs/supabase"],
})
