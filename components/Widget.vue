<script setup lang="ts">
//@ts-ignore
import Logo from "~/assets/images/logo.png"
import { PropType } from "vue"
import { Widget } from "interface"
import { mapIcon } from "mapping"
import { Navigation } from "swiper"

const props = defineProps({
  widget: Object as PropType<Widget>,
})

const images = computed(() => props.widget.heading.images.filter((i) => i))
const projects = computed(() => props.widget.projects.filter((i) => i.image))
const modules = [Navigation]
</script>

<template>
  <div class="w-full xs:w-84 rounded-2xl shadow-2xl p-6 bg-white border">
    <section id="heading" class="flex flex-col items-center">
      <div class="flex py-4">
        <img
          v-if="images.length"
          v-for="(image, i) in images"
          :src="image"
          class="w-26 h-26 bg-white flex-shrink-0 border-3 rounded-full !hover:z-10"
          :class="[i > 0 ? `-ml-${1 + images.length * 3}` : '']"
          :style="`z-index: ${10 - i}`"
          loading="lazy"
        />
        <div v-else class="w-26 h-26 bg-white flex-shrink-0 border-3 rounded-full !hover:z-10" />
      </div>
      <h3 class="mt-4 text-lg">
        {{ widget.heading.headline !== "" ? widget.heading.headline : "This project is made by" }}
      </h3>
      <h2 :style="`color: ${widget.style.text_primary}`" class="font-semibold text-2xl transition">
        {{ widget.heading.name !== "" ? widget.heading.name : "hiMaker 👋🏻" }}
      </h2>
    </section>

    <section id="links" class="mt-8">
      <NuxtLink
        :to="link.url"
        target="_blank"
        v-for="link in widget.links[0].list"
        :style="`color: ${widget.style.text_secondary}; background: ${widget.style.bg_primary};`"
        class="flex items-center px-6 py-3 rounded-xl transition font-semibold mb-2 transform scale-100 shadow-transparent hover:scale-101 hover:shadow-lg"
      >
        <div class="mr-4 text-xl" :class="mapIcon[link.icon]"></div>
        <p>{{ link.title }}</p>
      </NuxtLink>
    </section>

    <div class="my-4" />

    <section id="projects" class="flex flex-col items-center">
      <Divider align="center">
        <span>Projects</span>
      </Divider>

      <div class="relative w-full">
        <ClientOnly>
          <Swiper
            :navigation="{ nextEl: '.image-next', prevEl: '.image-prev' }"
            :slidesPerView="1.3"
            :spaceBetween="20"
            class="w-full"
            :modules="modules"
          >
            <SwiperSlide v-for="project in projects">
              <div
                :style="`border-color: ${widget.style.bg_primary}; background: ${widget.style.bg_primary}`"
                class="ml-1 xs:w-56 rounded-2xl overflow-hidden border-2 transform scale-100 shadow-transparent hover:scale-101 hover:shadow-xl transition"
              >
                <NuxtLink :to="project.url" target="_blank">
                  <img class="h-40 w-full object-cover" :src="project.image" alt="" loading="lazy" />
                  <p :style="`color: ${widget.style.text_secondary}; `" class="text-center py-2 font-semibold">
                    {{ project.title }}
                  </p>
                </NuxtLink>
              </div>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
        <button
          slot="container-end"
          aria-label="slider-left"
          class="image-prev absolute flex rounded-full z-20 -left-2 top-1/2 -mt-6 bg-white"
        >
          <div
            :style="`color: ${widget.style.text_primary}`"
            class="i-ion-md-arrow-dropleft-circle text-4xl transition"
          ></div>
        </button>
        <button
          slot="container-end"
          aria-label="slider-right"
          class="image-next absolute flex rounded-full z-20 -right-2 top-1/2 -mt-6 bg-white"
        >
          <div
            :style="`color: ${widget.style.text_primary}`"
            class="i-ion-md-arrow-dropright-circle text-4xl transition"
          ></div>
        </button>
      </div>
    </section>

    <section id="footer" class="mt-8 mb-4">
      <div class="w-full text-sm flex items-center justify-center group">
        <img
          class="w-6 h-6 transform -rotate-5 group-hover:-rotate-15 transition mr-4"
          :src="Logo"
          alt="hi Maker's logo"
        />
        <h4>
          Powered by
          <NuxtLink
            target="_blank"
            class="text-primary hover:text-primary-hover transition font-semibold"
            to="https://himaker.io"
            >hi Maker</NuxtLink
          >
        </h4>
      </div>
    </section>
  </div>
</template>
