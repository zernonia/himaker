<script setup lang="ts">
import { WidgetInfo } from "interface"

const client = useSupabaseClient()

const { data, pending, refresh } = await useLazyAsyncData(
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

refresh()
</script>

<template>
  <div>
    <Button class="!mb-4" label="Add widget" icon="pi pi-plus" iconPos="right" @click="addWidget"></Button>

    <div v-if="pending && !data?.length">Loading..</div>
    <div v-else v-for="info in data" class="mb-6">
      <NuxtLink :to="`/dashboard/widget/${info.id}/`">
        <div
          class="group w-full h-80 relative rounded-2xl bg-gray-50 overflow-y-hidden border transition ring-2 ring-transparent hover:border-dark-500 hover:ring-dark-400"
        >
          <div class="absolute top-4 left-4 text-2xl font-semibold opacity-20">
            {{ info.payload.heading.title !== "" ? info.payload.heading.title : "Title of this widget" }}
          </div>
          <div class="absolute top-20 group-hover:top-10 transition-all pb-20 left-1/2 transform -translate-x-1/2">
            <Widget :widget="info.payload"></Widget>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
