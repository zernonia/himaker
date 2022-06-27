<script setup lang="ts">
import Logo from "~/assets/images/logo.png"
import type { MenuItem } from "primevue/menuitem"

const user = useSupabaseUser()
const client = useSupabaseClient()
const { goSuper } = useSuper()
const menu = ref()
const items = ref<MenuItem[]>([
  {
    label: "Home",
    icon: "pi pi-fw pi-home",
    to: "/",
  },
  // {
  //   label: "Settings",
  //   icon: "pi pi-fw pi-user",
  //   to: "/dashboard/settings",
  // },
  {
    label: "SUPER!",
    icon: "pi pi-fw pi-star",
    command: () => goSuper(),
  },
  {
    label: "Logout",
    icon: "pi pi-fw pi-sign-out",
    command: async () => {
      await client.auth.signOut()
      navigateTo("/login")
    },
  },
])
</script>

<template>
  <div class="flex items-center justify-between">
    <NuxtLink :to="user?.id ? '/dashboard' : '/'" class="flex items-center text-4xl font-semibold">
      <img :src="Logo" alt="hiMaker logo" class="w-12 mr-2" />
      <span>hi Maker</span>
    </NuxtLink>

    <div v-if="user">
      <button
        @click="menu?.toggle"
        class="flex items-center px-4 py-1 rounded-xl bg-transparent hover:bg-gray-100 transition"
      >
        <p class="mr-4 font-semibold text-lg">{{ user.user_metadata.full_name }}</p>
        <img
          class="w-12 h-12 border rounded-full"
          :src="user.user_metadata.avatar_url"
          :alt="`${user.user_metadata.full_name}`"
        />
      </button>
      <Menu class="!w-12" ref="menu" :model="items" :popup="true"> </Menu>
    </div>
    <NuxtLink v-else to="/login">
      <Button label="Login"></Button>
    </NuxtLink>
  </div>
</template>
