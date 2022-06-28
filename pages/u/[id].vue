<script setup lang="ts">
import { WidgetInfo } from "interface"

const {
  params: { id },
} = useRoute()
const client = useSupabaseClient()

const { data } = useAsyncData(`user-${id}`, async () => {
  const { data } = await client.from<WidgetInfo>("widgets").select("*").eq("id", "p4ueqrlg").single()
  return data
})

definePageMeta({
  layout: "blank",
})
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <Widget :widget="data.payload"></Widget>
  </div>
</template>
