<script setup lang="ts">
import Logo from "~~/assets/images/logo.svg"
import type { Provider } from "@supabase/gotrue-js"

const user = useSupabaseUser()
const client = useSupabaseClient()
const isLoading = ref(false)
const login = (provider: Provider) => {
  if (!provider) return
  isLoading.value = true

  client.auth.signIn(
    {
      provider,
    },
    { redirectTo: window.location.origin + "/dashboard" }
  )
}

const { hash } = useRoute()
onMounted(() => {
  if (hash.includes("access_token")) isLoading.value = true
})

watch(user, (n) => {
  if (!n?.id) return
  navigateTo("/dashboard")
})

useCustomHead("Login")
definePageMeta({
  middleware: "login",
})
</script>

<template>
  <div class="mx-auto mt-20 flex flex-col items-center w-max space-y-3">
    <img :src="Logo" class="w-44" alt="Hi Maker logo" />
    <h2 class="!-mt-16 text-4xl font-semibold !mb-10">Login</h2>
    <Button :loading="isLoading" class="!mt-16 flex items-center space-x-2 p-button-secondary" @click="login('github')">
      <div class="i-ion-logo-github text-2xl"></div>
      <p class="text-lg font-semibold">Login with GitHub</p>
    </Button>
    <Button :loading="isLoading" class="flex items-center space-x-2 p-button-info" @click="login('google')">
      <div class="i-ion-logo-google text-2xl"></div>
      <p class="text-lg font-semibold">Login with Google</p>
    </Button>

    <p class="pt-4 max-w-64 text-xs">
      By logging in, you are agree to the <NuxtLink to="/terms-of-service"> term of service</NuxtLink>
    </p>
  </div>
</template>
