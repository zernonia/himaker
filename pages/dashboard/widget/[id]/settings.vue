<script setup lang="ts">
const widget = useWidgetStore()
const { settings } = toRefs(widget.value)
</script>

<template>
  <div class="p-6 w-full bg-gray-50 rounded-xl flex flex-col space-y-4 form">
    <div>
      <div class="flex items-center space-x-4 mb-2">
        <label for="remove_branding">Remove Branding</label>
        <TagSuper></TagSuper>
      </div>
      <InputSwitch v-model="settings.remove_branding"></InputSwitch>
    </div>

    <div class="pointer-events-none opacity-30">
      <div class="flex items-center space-x-4 mb-2">
        <label for="remove_branding">Collect feedback</label>
        <TagSuper></TagSuper>
        <p class="text-sm">-- Coming soon --</p>
      </div>
      <InputSwitch v-model="settings.collect_feedback"></InputSwitch>
    </div>

    <div class="pointer-events-none opacity-30">
      <div class="flex items-center space-x-4 mb-2">
        <label for="remove_branding">Analytics</label>
        <TagSuper></TagSuper>
        <p class="text-sm">-- Coming soon --</p>
      </div>
      <InputSwitch v-model="settings.analytics"></InputSwitch>
    </div>
  </div>
</template>
