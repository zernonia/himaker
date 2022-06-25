<script setup lang="ts">
//@ts-ignore
import Logo from "/logo.svg"
</script>

<template>
  <div class="flex items-center justify-between">
    <NuxtLink to="/" class="flex items-center text-4xl font-semibold">
      <img :src="Logo" alt="hiMaker logo" class="w-12 mr-2" />
      <span>hi Maker</span>
    </NuxtLink>

    <NuxtLink to="/login">
      <Button label="Login"></Button>
    </NuxtLink>
  </div>
</template>
