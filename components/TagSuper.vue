<script setup lang="ts">
const goSuper = () => {
  console.log("SUPER!!!")
}
</script>

<template>
  <button
    class="px-3 py-1.5 rounded-lg bg-dark-500 text-white text-[10px] flex items-center space-x-2 font-semibold"
    @click="goSuper"
  >
    <p class="text-xs">🚀</p>
    <p>SUPER</p>
  </button>
</template>
