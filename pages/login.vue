<script setup lang="ts">
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
</script>

<template>
  <div>
    <Button @click="login('github')">Login with GitHub</Button>
  </div>
</template>
