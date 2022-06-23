import PrimeVue from "primevue/config"
import InputText from "primevue/inputtext"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(PrimeVue)
  nuxt.vueApp.component("InputText", InputText)
})
