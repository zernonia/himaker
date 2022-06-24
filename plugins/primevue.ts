import PrimeVue from "primevue/config"
import Button from "primevue/button"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import Menu from "primevue/menu"
import ContextMenu from "primevue/contextmenu"
import OverlayPanel from "primevue/overlaypanel"
import Divider from "primevue/divider"

import "primevue/resources/themes/lara-light-teal/theme.css"
import "primevue/resources/primevue.css"
import "primeicons/primeicons.css"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(PrimeVue)
  nuxt.vueApp.component("Button", Button)
  nuxt.vueApp.component("InputText", InputText)
  nuxt.vueApp.component("Dropdown", Dropdown)
  nuxt.vueApp.component("Menu", Menu)
  nuxt.vueApp.component("ContextMenu", ContextMenu)
  nuxt.vueApp.component("OverlayPanel", OverlayPanel)
  nuxt.vueApp.component("Divider", Divider)
})
