<script setup lang="ts">
useHead({
  title: "Home",
  titleTemplate: (title) => `${title} | hi Maker 👋🏻 `,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  link: [{ rel: "icon", href: "/logo.svg" }],
})
</script>

<template>
  <div class="p-8 max-w-screen-lg mx-auto">
    <Header></Header>
    <NuxtPage class="mt-8"></NuxtPage>
  </div>
</template>
