import { Users } from "interface"

export const useUserStore = () => {
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

  return {
    user,
    isSuperUser,
  }
}
