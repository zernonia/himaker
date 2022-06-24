<script setup lang="ts">
import { onClickOutside } from "@vueuse/core"
import type { MenuItem } from "primevue/menuitem"

const emits = defineEmits(["upload", "add"])

const menu = ref()
const items = ref<MenuItem[]>([
  {
    label: "Upload",
    icon: "pi pi-fw pi-upload",
    command: () => uploadEl.value.click(),
  },
  {
    label: "Add URL",
    icon: "pi pi-fw pi-link",
    command: () => {
      enableAdd.value = true
      nextTick(() => {
        addEl.value.querySelector("input").focus()
      })
    },
  },
])

const addEl = ref()
const addText = ref("")
const enableAdd = ref(false)
const submit = () => {
  emits("add", addText.value)
  exit()
}
onClickOutside(addEl, () => {
  exit()
})
const exit = () => {
  enableAdd.value = false
  addText.value = ""
}

const uploadEl = ref()
</script>

<template>
  <div class="relative">
    <Button
      @click="menu?.toggle"
      icon="pi pi-plus"
      class="p-button-rounded p-button-sm !mt-2 !mr-4 !w-10 !h-10"
    ></Button>
    <Menu ref="menu" :model="items" :popup="true" />
    <div ref="addEl" v-if="enableAdd" class="absolute top-full mt-1 left-0 z-10 shadow-lg">
      <div class="p-inputgroup h-40px">
        <InputText v-model="addText" class="!w-48" placeholder="Image url" />
        <Button @click="submit" icon="pi pi-check" />
      </div>
    </div>
    <input class="hidden" ref="uploadEl" type="file" @input="emits('upload', uploadEl)" accept="image/*" />
  </div>
</template>
