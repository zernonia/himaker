<script setup lang="ts">
import { PropType } from "vue"
import { Widget } from "interface"
import { mapIcon } from "mapping"
import { Navigation } from "swiper"

const props = defineProps({
  widget: Object as PropType<Widget>,
})

const images = computed(() => props.widget.heading.images.filter((i) => i))
const modules = [Navigation]
</script>

<template>
  <div class="w-84 rounded-2xl shadow-2xl p-6 bg-white">
    <section id="heading" class="flex flex-col items-center">
      <div class="flex py-4">
        <img
          v-for="(image, i) in images"
          :src="image"
          class="w-26 h-26 flex-shrink-0 border-3 rounded-full !hover:z-10"
          :class="[i > 0 ? `-ml-${2 + images.length * 2}` : '']"
          :style="`z-index: ${10 - i}`"
        />
      </div>
      <h3 class="mt-4 text-lg">
        {{ widget.heading.headline !== "" ? widget.heading.headline : "This project is made by" }}
      </h3>
      <h2 class="text-orange-500 font-semibold text-2xl">{{ widget.heading.name ?? "Zernonia" }}</h2>
    </section>

    <section id="links" class="mt-8">
      <NuxtLink
        :to="link.url"
        target="_blank"
        v-for="link in widget.links[0].list"
        class="flex items-center px-6 py-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition text-orange-500 font-semibold mb-2"
      >
        <div class="mr-4 text-xl" :class="mapIcon[link.icon]"></div>
        <p>{{ link.title }}</p>
      </NuxtLink>
    </section>

    <ClientOnly>
      <section id="projects" class="mt-8 flex flex-col items-center">
        <Divider align="center">
          <span>Projects</span>
        </Divider>

        <div class="relative w-full">
          <Swiper
            :navigation="{ nextEl: '.image-next', prevEl: '.image-prev' }"
            :slidesPerView="1.3"
            :spaceBetween="20"
            class="w-full"
            :modules="modules"
          >
            <SwiperSlide v-for="project in widget.projects">
              <div
                class="ml-1 w-56 rounded-xl overflow-hidden border border-orange-300 shadow-transparent hover:shadow transition"
              >
                <NuxtLink :to="project.url" target="_blank">
                  <img class="h-40 w-full object-cover" :src="project.image" alt="" />
                  <p class="text-center py-2 font-semibold bg-orange-50 text-orange-500">{{ project.title }}</p>
                </NuxtLink>
              </div>
            </SwiperSlide>
          </Swiper>
          <button
            slot="container-end"
            aria-label="slider-left"
            class="image-prev absolute flex rounded-full z-20 -left-2 top-1/2 -mt-6 bg-white"
          >
            <div class="i-ion-md-arrow-dropleft-circle text-4xl text-orange-400 hover:text-orange-500 transition"></div>
          </button>
          <button
            slot="container-end"
            aria-label="slider-right"
            class="image-next absolute flex rounded-full z-20 -right-2 top-1/2 -mt-6 bg-white"
          >
            <div
              class="i-ion-md-arrow-dropright-circle text-4xl text-orange-400 hover:text-orange-500 transition"
            ></div>
          </button>
        </div>
      </section>
    </ClientOnly>
  </div>
</template>
