<script setup lang="ts">
const {
  params: { id },
} = useRoute()
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div>
      <InputText></InputText>
    </div>
    {{ id }}
  </div>
</template>
