import { stripe } from "utils/stripe"
import { upsertProductRecord, upsertPriceRecord, manageSubscriptionStatusChange } from "utils/supabase-admin"
import Stripe from "stripe"
import { Readable } from "node:stream"

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
])

export default defineEventHandler(async (event) => {
  const { req, res } = event
  if (req.method === "POST") {
    const buf = await buffer(req)
    const sig = req.headers["stripe-signature"]
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event

    try {
      if (!sig || !webhookSecret) return
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`)
      res.statusCode = 400
      return `Webhook Error: ${err.message}`
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case "product.created":
          case "product.updated":
            await upsertProductRecord(event.data.object as Stripe.Product)
            break
          case "price.created":
          case "price.updated":
            await upsertPriceRecord(event.data.object as Stripe.Price)
            break
          case "customer.subscription.created":
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription
            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer as string,
              event.type === "customer.subscription.created"
            )
            break
          case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            if (checkoutSession.mode === "subscription") {
              const subscriptionId = checkoutSession.subscription
              await manageSubscriptionStatusChange(subscriptionId as string, checkoutSession.customer as string, true)
            }
            break
          default:
            throw new Error("Unhandled relevant event!")
        }
      } catch (error) {
        console.log(error)
        res.statusCode = 400
        return 'Webhook error: "Webhook handler failed. View logs."'
      }
    }

    return { received: true }
  } else {
    res.setHeader("Allow", "POST")
    res.statusCode = 405
    return "Method Not Allowed"
  }
})
