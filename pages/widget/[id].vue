<script setup lang="ts">
import type { Widget, WidgetInfo } from "interface"

const {
  params: { id },
} = useRoute()
const client = useSupabaseClient()

const { data } = useAsyncData<Widget>(`widget-${id}`, async () => {
  const { data } = await client.from<WidgetInfo>("widgets").select("*").eq("id", id.toString()).single()
  return data.payload
})

definePageMeta({
  layout: "blank",
})
</script>

<template>
  <Widget v-if="data" :widget="data"></Widget>
</template>
