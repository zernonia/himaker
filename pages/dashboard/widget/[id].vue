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
    <div class="w-full h-64 rounded-2xl bg-gray-50 flex items-center justify-center">
      this will be the preview for {{ id }}
      <div>{{ widget }}</div>
    </div>

    <div class="flex mt-8">
      <div class="flex flex-col items-start space-y-4 flex-shrink-0 w-1/5">
        <button @click="goTo('')">Heading</button>
        <button @click="goTo('links')">Links</button>
        <button @click="goTo('projects')">Projects</button>
        <button @click="goTo('etc')">Etc</button>
      </div>

      <div class="w-4/5">
        <ClientOnly>
          <NuxtPage></NuxtPage>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
