<script setup lang="ts">
import type { Widget, WidgetInfo } from "interface"

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
  <ScrollPanel style="width: 100%; height: 600px" class="custom">
    <Widget v-if="data" :widget="data"></Widget>
  </ScrollPanel>
</template>
