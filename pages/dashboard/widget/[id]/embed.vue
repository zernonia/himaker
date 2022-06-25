<script setup lang="ts">
import { useClipboard } from "@vueuse/core"

const {
  params: { id },
} = useRoute()

const codeString = computed(
  () => `<script \n src="https://www.himaker.io/scripts/embed.js" \n async \n defer \n data-widget-id="${id}" \n>`
)
const { copy, copied } = useClipboard({ source: codeString })
const clickCopy = () => {
  copy()
}
</script>

<template>
  <div class="p-6 w-full bg-gray-50 rounded-xl flex flex-col space-y-4 form">
    <h3>Script</h3>

    <pre class="p-6 bg-white rounded-xl border"><code>{{ codeString }}</code></pre>

    <Button
      class="w-max"
      label="Copy"
      :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
      iconPos="right"
      @click="clickCopy"
    ></Button>
  </div>
</template>
