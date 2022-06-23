import { Swiper, SwiperSlide } from "swiper/vue"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.component("Swiper", Swiper)
  nuxt.vueApp.component("SwiperSlide", SwiperSlide)
})
