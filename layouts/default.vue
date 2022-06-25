<script setup lang="ts">
import { Users } from "interface"

const client = useSupabaseClient()
const user = useSupabaseUser()
const userStore = useUserStore()

await useLazyAsyncData(
  "user-id",
  async () => {
    const { data } = await client.from<Users>("users").select("*").eq("id", user.value.id).single()
    userStore.value = data
    return data
  },
  { server: false }
)
</script>

<template>
  <div class="p-8 max-w-screen-lg mx-auto">
    <Header></Header>
    <NuxtPage class="mt-8"></NuxtPage>

    <Script src="/scripts/embed.js" data-widget-id="p4ueqrlg" async defer data-placement="left"></Script>
  </div>
</template>
