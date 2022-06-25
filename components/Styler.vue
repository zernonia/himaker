<script setup lang="ts">
const widget = useWidgetStore()
</script>

<template>
  <div class="p-4 rounded-xl border shadow bg-white flex flex-col space-y-2">
    <input
      v-tippy="{ content: 'Primary background', placement: 'left' }"
      type="color"
      v-model="widget.style.bg_primary"
      name="bg_primary"
      id="bg_primary"
    />
    <input
      v-tippy="{ content: 'Primary text', placement: 'left' }"
      type="color"
      v-model="widget.style.text_primary"
      name="text_primary"
      id="text_primary"
    />
    <input
      v-tippy="{ content: 'Secondary text', placement: 'left' }"
      type="color"
      v-model="widget.style.text_secondary"
      name="text_secondary"
      id="text_secondary"
    />
  </div>
</template>
