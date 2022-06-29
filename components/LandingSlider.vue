<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core"

import { widgetIndieHacker, widgetDeveloper, widgetContentCreator } from "~~/utils/constant"
const currentSlide = ref(0)

const { pause, resume, isActive } = useIntervalFn(() => {
  /* your function */
  if (currentSlide.value == 2) {
    currentSlide.value = 0
  } else {
    currentSlide.value++
  }
}, 3000)
</script>

<template>
  <div @mouseenter="pause" @mouseleave="resume" class="flex flex-col items-center w-full mt-8">
    <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
      <Button
        @click="currentSlide = 0"
        :class="{ 'p-button-outlined': currentSlide != 0 }"
        class="!sm:text-lg"
        label="Indie Hacker"
      ></Button>
      <Button
        :class="{ 'p-button-outlined': currentSlide != 1 }"
        @click="currentSlide = 1"
        class="!sm:text-lg"
        label="Developer"
      ></Button>
      <Button
        :class="{ 'p-button-outlined': currentSlide != 2 }"
        @click="currentSlide = 2"
        class="!sm:text-lg"
        label="Content Creator"
      ></Button>
    </div>
    <div class="sm:p-12 mt-6 w-full flex relative justify-center rounded-4xl bg-gray-100">
      <Transition name="slide-down-fade" mode="out-in">
        <Widget v-if="currentSlide == 0" :widget="widgetIndieHacker"></Widget>
        <Widget v-else-if="currentSlide == 1" :widget="widgetDeveloper"></Widget>
        <Widget v-else-if="currentSlide == 2" :widget="widgetContentCreator"></Widget>
      </Transition>
    </div>
  </div>
</template>
