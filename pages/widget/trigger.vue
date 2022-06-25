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

definePageMeta({
  layout: "blank",
})
</script>

<template>
  <div>
    <TriggerButton :widget="data"></TriggerButton>
  </div>
</template>
