<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem"

const props = defineProps({
  horizontal: Boolean,
})
const emits = defineEmits(["delete"])
const menu = ref()
const items = ref<MenuItem[]>([
  {
    label: "Delete",
    icon: "pi pi-fw pi-trash",
    command: (ev) => emits("delete", ev),
  },
])
</script>

<template>
  <button
    class="mr-2 py-1 text-gray-400 hover:text-gray-800 handle bg-transparent hover:bg-gray-200 transition rounded"
    :class="{ 'transform rotate-90': horizontal }"
    @click="menu.toggle"
    @contextmenu="menu.toggle"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      class="iconify iconify--radix-icons"
      width="24"
      height="24"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 15 15"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M5.5 4.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Zm4 0a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25ZM10.625 7.5a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0ZM5.5 8.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Zm5.125 2.875a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0ZM5.5 12.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </button>
  <Menu ref="menu" :model="items" :popup="true" />
</template>
