<script setup lang="ts">
import type { Widget, WidgetInfo } from "interface"

const {
  query: { widgetId },
} = useRoute()
const client = useSupabaseClient()

const { data } = useAsyncData<Widget>(`trigger-${widgetId}`, async () => {
  const { data } = await client.from<WidgetInfo>("widgets").select("*").eq("id", widgetId.toString()).single()
  return data.payload
})
const images = computed(() => data.value.heading.images.filter((i) => i).slice(0, 3))
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
  startInterval()
})

definePageMeta({
  layout: "blank",
})
</script>

<template>
  <button
    v-if="data"
    class="px-4 py-2 w-48 h-12 bg-white hover:bg-gray-100 transition rounded-tr-xl shadow-lg flex items-center"
  >
    <div class="w-8 h-full relative flex-shrink-0 flex mr-2">
      <template v-for="(image, i) in images">
        <Transition mode="out-in" name="fade">
          <img v-if="i === currentIndex" class="absolute top-1 left-1 w-6 h-6 rounded-full" :src="image" alt="" />
        </Transition>
      </template>
    </div>
    <p class="w-30 text-left truncate">
      {{ data.heading.title }}
    </p>
  </button>
</template>
