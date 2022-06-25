import { plugin as VueTippy } from "vue-tippy"
import "tippy.js/dist/tippy.css"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(VueTippy, {
    directive: "tippy",
    defaultProps: {
      trigger: "mouseenter focus click",
    },
  })
})
