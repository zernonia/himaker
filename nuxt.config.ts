import { defineNuxtConfig } from "nuxt"
import { fileURLToPath } from "url"
import presetIcons from "@unocss/preset-icons"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: { interface: fileURLToPath(new URL("./utils/interface", import.meta.url)) },
  css: ["~/assets/main.css"],
  modules: ["nuxt-windicss", "@nuxtjs/supabase", "@unocss/nuxt"],
  unocss: {
    icons: true,
    presets: [
      presetIcons({
        collections: {
          ion: () => import("@iconify-json/ion/icons.json").then((i) => i.default),
        },
      }),
    ],
    safelist: [
      "i-ion-link",
      "i-ion-logo-twitter",
      "i-ion-logo-facebook",
      "i-ion-logo-instagram",
      "i-ion-logo-pinterest",
      "i-ion-logo-github",
      "i-ion-logo-dribbble",
    ],
  },
})
