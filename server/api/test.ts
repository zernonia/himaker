import { stripe } from "~~/utils/stripe"
import { manageSubscriptionStatusChange } from "~~/utils/supabase-admin"

export default defineEventHandler(async (event) => {
  await manageSubscriptionStatusChange("sub_1LEvrvJvLKxh6TtRvIHQJngY", "cus_LwpE0jKtoiHcdf", true)

  return "hi"
})
