import { Users } from "interface"

export const useUserStore = () =>
  useState<Users>("user", () => ({
    id: "",
    full_name: "",
    avatar_url: "",
    billing_address: "",
    payment_method: "",
  }))
