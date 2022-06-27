<script setup lang="ts">
import Logo from "~~/assets/images/logo.svg"
import type { Provider } from "@supabase/gotrue-js"

const client = useSupabaseClient()
const login = (provider: Provider) => {
  if (!provider) return

  client.auth.signIn(
    {
      provider,
    },
    { redirectTo: window.location.origin + "/dashboard" }
  )
}

useCustomHead("Login")
</script>

<template>
  <div class="mx-auto mt-20 flex flex-col items-center w-max space-y-3">
    <img :src="Logo" class="w-44" alt="hi Maker logo" />
    <h2 class="!-mt-16 text-4xl font-semibold !mb-10">Login</h2>
    <Button class="flex items-center space-x-2 p-button-secondary" @click="login('github')">
      <div class="i-ion-logo-github text-2xl"></div>
      <p class="text-lg font-semibold">Login with GitHub</p>
    </Button>
    <Button class="flex items-center space-x-2 p-button-info" @click="login('google')">
      <div class="i-ion-logo-google text-2xl"></div>
      <p class="text-lg font-semibold">Login with Google</p>
    </Button>
  </div>
</template>
