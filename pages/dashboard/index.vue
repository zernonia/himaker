<script setup lang="ts">
import { WidgetInfo } from "interface"

const client = useSupabaseClient()

const { data, pending } = await useLazyAsyncData(
  "widget-list",
  async () => {
    const { data } = await client.from<WidgetInfo>("widgets").select("*").order("created_at", { ascending: true })
    return data
  },
  { server: false }
)

const addWidget = () => {
  const id = (Math.random() + 1).toString(36).substring(4)
  navigateTo(`/dashboard/widget/${id}`)
}
</script>

<template>
  <div>
    <Button class="!mb-4" @click="addWidget">Add widget</Button>

    <div v-for="info in data" class="mb-6">
      <NuxtLink :to="`/dashboard/widget/${info.id}`">
        <div
          class="w-full h-80 relative rounded-2xl bg-gray-50 overflow-y-hidden border transition ring-2 ring-transparent hover:border-gray-300 hover:ring-teal-200"
        >
          <div class="absolute top-4 left-4 text-2xl font-semibold opacity-20">
            {{ info.payload.heading.title !== "" ? info.payload.heading.title : "Title of this widget" }}
          </div>
          <div class="absolute top-20 pb-20 left-1/2 transform -translate-x-1/2">
            <Widget :widget="info.payload"></Widget>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
