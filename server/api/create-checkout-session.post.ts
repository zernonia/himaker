import { stripe } from "~~/utils/stripe"
import { serverSupabaseUser } from "#supabase/server"
import { createOrRetrieveCustomer } from "~~/utils/supabase-admin"
import { getURL } from "~~/utils/helpers"
import { sendError } from "h3"

// let user add product then checkout
export default defineEventHandler(async (event) => {
  const { price, quantity = 1, metadata = {} } = await useBody(event)
  const user = await serverSupabaseUser(event)

  try {
    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      line_items: [
        {
          price,
          quantity,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata,
      },
      success_url: `${getURL()}/dashboard/settings/account`,
      cancel_url: `${getURL()}/dashboard`,
    })

    return { sessionId: session.id }
  } catch (err: any) {
    console.log(err)
    sendError(event, err.message)
  }
})
