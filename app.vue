<script setup lang="ts">
useHead({
  titleTemplate: (title) => `${title} | Hi Maker 👋🏻 `,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  link: [{ rel: "icon", href: "/logo.svg" }],
})
useCustomHead("Home")
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
