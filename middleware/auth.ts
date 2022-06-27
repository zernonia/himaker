export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  if (!user.value?.id) {
    return navigateTo("/login", { redirectCode: 301 })
  }
})
