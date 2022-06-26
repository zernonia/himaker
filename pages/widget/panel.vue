<script setup lang="ts">
import type { Widget, WidgetInfo } from "interface"
import Scrollbar from "smooth-scrollbar"

const w = ref<HTMLElement>()
onMounted(() => {
  if (!w) return
  Scrollbar.init(w.value)
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
  <div ref="w" class="xs:h-600px">
    <Widget class="border-transparent" v-if="data" :widget="data"></Widget>
  </div>
</template>
