<script setup lang="ts">
const {
  params: { id },
} = useRoute()

const goTo = (child: string) => {
  navigateTo(`/dashboard/widget/${id}/${child}`)
}
const widget = useWidgetStore()
</script>

<template>
  <div>
    <div class="w-full h-64 rounded-2xl bg-orange-50 flex items-center justify-center">
      this will be the preview for {{ id }}
      <div>{{ widget }}</div>
    </div>

    <div class="flex mt-8">
      <div class="flex flex-col items-start space-y-4 w-48">
        <button @click="goTo('')">Heading</button>
        <button @click="goTo('links')">Links</button>
        <button @click="goTo('projects')">Projects</button>
        <button @click="goTo('etc')">Etc</button>
      </div>

      <div class="ml-8 w-full">
        <ClientOnly>
          <NuxtPage></NuxtPage>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
