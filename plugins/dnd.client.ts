import { Container, Draggable } from "vue3-smooth-dnd"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.component("Container", Container)
  nuxt.vueApp.component("Draggable", Draggable)
})
