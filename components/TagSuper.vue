<script setup lang="ts">
import LogoSuper from "~~/assets/images/logoSuper.svg"

const { goSuper } = useSuper()
</script>

<template>
  <button
    class="px-3 py-1.5 rounded-lg bg-dark-500 text-white text-[10px] flex items-center space-x-2 font-semibold"
    @click="goSuper"
  >
    <img :src="LogoSuper" alt="go Super!" class="w-4 mb-0.5" />
    <p>SUPER</p>
  </button>
</template>
