<script setup lang="ts">
const client = useSupabaseClient()

const { data, pending } = await useLazyAsyncData(
  "widget-list",
  async () => {
    const { data } = await client.from("widgets").select("*")
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
    <Button @click="addWidget">Add widget</Button>

    <NuxtLink :to="`/dashboard/widget/${widget.id}`" v-for="widget in data">
      {{ widget.id }}
    </NuxtLink>
  </div>
</template>
