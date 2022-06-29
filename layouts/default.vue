<script setup lang="ts">
const user = useSupabaseUser()
const { fetchUser } = useUserStore()
onMounted(() => {
  fetchUser()
})
watch(user, () => {
  fetchUser()
})
</script>

<template>
  <div class="p-4 md:p-8 pb-16 max-w-screen-lg mx-auto">
    <Header></Header>
    <NuxtPage class="mt-8"></NuxtPage>

    <GoSuper></GoSuper>
    <Script src="/scripts/embed.min.js" data-widget-id="fmbp30ep" async defer></Script>
  </div>
</template>
