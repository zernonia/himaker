import PrimeVue from "primevue/config"
import Button from "primevue/button"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"

import "primevue/resources/themes/lara-light-teal/theme.css"
import "primevue/resources/primevue.css"
import "primeicons/primeicons.css"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(PrimeVue)
  nuxt.vueApp.component("Button", Button)
  nuxt.vueApp.component("InputText", InputText)
  nuxt.vueApp.component("Dropdown", Dropdown)
})
