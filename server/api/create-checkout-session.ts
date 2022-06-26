import { stripe } from "~~/utils/stripe"
import { serverSupabaseUser } from "#supabase/server"
import { createOrRetrieveCustomer } from "~~/utils/supabase-admin"
import { getURL } from "~~/utils/helpers"

export default defineEventHandler(async (event) => {
  const { req, res } = event
  if (req.method === "POST") {
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
            price: price.id,
            quantity,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        subscription_data: {
          trial_from_plan: true,
          metadata,
        },
        success_url: `${getURL()}/account`,
        cancel_url: `${getURL()}/`,
      })

      return { sessionId: session.id }
    } catch (err: any) {
      console.log(err)
      res.statusCode = 500
      return { error: { statusCode: 500, message: err.message } }
    }
  } else {
    res.setHeader("Allow", "POST")
    res.statusCode = 405
    return "Method Not Allowed"
  }
})
