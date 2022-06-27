<script setup lang="ts">
import { Users, Subscription } from "interface"

const client = useSupabaseClient()
const user = useSupabaseUser()
const { user: userStore } = useUserStore()

await useLazyAsyncData(
  "user-info",
  async () => {
    const [{ data: userData }, { data: subscriptionData }] = await Promise.all([
      client.from<Users>("users").select("*").eq("id", user.value.id).single(),
      client.from<Subscription>("subscriptions").select("*").eq("user_id", user.value.id).single(),
    ])

    userStore.value = {
      ...userData,
      subscription: subscriptionData,
    }
    return userData
  },
  { server: false }
)
</script>

<template>
  <div class="p-8 max-w-screen-lg mx-auto">
    <Header></Header>
    <NuxtPage class="mt-8"></NuxtPage>

    <GoSuper></GoSuper>
    <Script src="/scripts/embed.js" data-widget-id="p4ueqrlg" async defer data-placement="left"></Script>
  </div>
</template>
