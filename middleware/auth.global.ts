export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  if (to.path.includes("dashboard") && !user.value.id) {
    return navigateTo("/login", { redirectCode: 301 })
  }
})
