<script setup lang="ts">
import { useClipboard } from "@vueuse/core"

const {
  params: { id },
} = useRoute()

const codeString = computed(
  () =>
    `<script \n src="https://www.himaker.io/scripts/embed.js" \n async \n defer \n data-widget-id="${id}" \n>` +
    `</` +
    "script>"
)
const srcString = computed(
  () =>
    `
<script>
  const s = document.createElement('script')
  s.src= "https://www.himaker.io/scripts/embed.js" 
  s.async = true
  s.defer = true
  s.dataset.id = '${id}' 
</` + "script>"
)

const { copy, copied } = useClipboard()
const clickCopy = (code: string) => {
  copy(code)
}

onMounted(() => {})
</script>

<template>
  <div class="p-6 w-full bg-gray-50 rounded-xl flex flex-col space-y-4 form">
    <h3>Script</h3>

    <div class="relative">
      <pre class="p-6 bg-white rounded-xl border"><code>{{ codeString }}</code></pre>

      <Button
        class="w-max !absolute top-3 right-3"
        label="Copy"
        icon="pi pi-copy"
        iconPos="right"
        @click="clickCopy(codeString)"
      ></Button>
    </div>

    <p class="mx-auto text-gray-400">or</p>

    <div class="relative">
      <pre class="px-6 py-2 bg-white rounded-xl border">
        <code>{{srcString}}</code> 
      </pre>
      <Button
        class="w-max !absolute top-3 right-3"
        label="Copy"
        icon="pi pi-copy"
        iconPos="right"
        @click="clickCopy(srcString)"
      ></Button>
    </div>
  </div>
</template>
