<script setup lang="ts">
import { PropType } from "vue"
import { Widget } from "interface"

const props = defineProps({
  widget: Object as PropType<Widget>,
})

const images = computed(() => props.widget.heading.images.filter((i) => i))

const currentIndex = ref(0)
const startInterval = () => {
  setInterval(() => {
    if (images.value.length - 1 > currentIndex.value) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
  }, 3000)
}

onMounted(() => {
  // startInterval()
})
</script>

<template>
  <button
    v-if="widget"
    class="px-4 py-2 w-48 h-12 bg-white border hover:bg-gray-50 transition rounded-xl shadow-lg flex items-center"
  >
    <div class="w-8 h-full relative flex-shrink-0 flex mr-2">
      <template v-for="(image, i) in images">
        <Transition mode="out-in" name="fade">
          <img v-if="i === currentIndex" class="absolute top-1 left-1 w-6 h-6 rounded-full" :src="image" alt="" />
        </Transition>
      </template>
    </div>
    <p class="w-30 text-left truncate">
      {{ widget.heading.title !== "" ? widget.heading.title : "By hiMaker 👋🏻" }}
    </p>
  </button>
</template>
