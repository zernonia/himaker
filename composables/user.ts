import { Users } from "interface"
import { Subscription } from "interface"

export const useUserStore = () => {
  const supabaseUser = useSupabaseUser()
  const user = useState<Users>("user", () => ({
    id: "",
    full_name: "",
    avatar_url: "",
    billing_address: "",
    payment_method: "",
  }))

  const isSuperUser = computed(() => {
    return user.value?.subscription?.status === "active"
  })

  const client = useSupabaseClient()
  const fetchUser = async () => {
    if (!supabaseUser.value?.id) return
    const [{ data: userData }, { data: subscriptionData }] = await Promise.all([
      client.from<Users>("users").select("*").eq("id", supabaseUser.value.id).single(),
      client.from<Subscription>("subscriptions").select("id, status").eq("user_id", supabaseUser.value.id).single(),
    ])

    user.value = {
      ...userData,
      subscription: subscriptionData,
    }
  }

  return {
    user,
    isSuperUser,
    fetchUser,
  }
}
