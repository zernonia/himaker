import { stripe } from "~~/utils/stripe"
import { serverSupabaseUser } from "#supabase/server"
import { createOrRetrieveCustomer } from "~~/utils/supabase-admin"
import { getURL } from "~~/utils/helpers"
import { sendError } from "h3"

// let user manage the account stuff
export default defineEventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)
    if (!user) throw Error("Could not get user")
    const customer = await createOrRetrieveCustomer({
      uuid: user.id || "",
      email: user.email || "",
    })

    if (!customer) throw Error("Could not get customer")
    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/dashboard/settings/account`,
    })

    return { url }
  } catch (err: any) {
    console.log(err)
    sendError(event, err.message)
  }
})
