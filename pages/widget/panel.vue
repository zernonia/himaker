<script setup lang="ts">
import type { Widget, WidgetInfo } from "interface"
import Scrollbar from "smooth-scrollbar"
import { useWindowSize, whenever } from "@vueuse/core"

const w = ref<HTMLElement>()
const { height } = useWindowSize()

whenever(height, () => {
  if (height.value) {
    nextTick(() => {
      Scrollbar.init(w.value)
    })
  }
})

const {
  query: { widgetId },
} = useRoute()
const client = useSupabaseClient()

const { data } = useAsyncData<Widget>(`panel-${widgetId}`, async () => {
  const { data } = await client.from<WidgetInfo>("widgets").select("*").eq("id", widgetId.toString()).single()
  return data.payload
})

definePageMeta({
  layout: "blank",
})
</script>

<template>
  <div ref="w" v-if="data" :style="`height: ${height ?? 0}px`">
    <Widget class="border-transparent" v-if="data" :widget="data"></Widget>
  </div>
</template>
