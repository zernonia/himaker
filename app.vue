<script setup lang="ts">
useHead({
  title: "Home",
  titleTemplate: (title) => `${title} | HiMaker 👋🏻 `,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  link: [{ rel: "icon", href: "/logo.svg" }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
