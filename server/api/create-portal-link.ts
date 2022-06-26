import { stripe } from "~~/utils/stripe"
import { serverSupabaseUser } from "#supabase/server"
import { createOrRetrieveCustomer } from "~~/utils/supabase-admin"
import { getURL } from "~~/utils/helpers"

export default defineEventHandler(async (event) => {
  const { req, res } = event
  if (req.method === "POST") {
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
        return_url: `${getURL()}/account`,
      })

      return { url }
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
