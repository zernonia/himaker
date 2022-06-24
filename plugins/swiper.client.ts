import { Swiper, SwiperSlide } from "swiper/vue"

import "swiper/css"
import "swiper/css/navigation"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.component("Swiper", Swiper)
  nuxt.vueApp.component("SwiperSlide", SwiperSlide)
})
