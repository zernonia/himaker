import { loadStripe, Stripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  const { STRIPE_PUBLISHABLE_KEY_LIVE, STRIPE_PUBLISHABLE_KEY } = useRuntimeConfig()
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY_LIVE ?? STRIPE_PUBLISHABLE_KEY ?? "")
  }

  return stripePromise
}
