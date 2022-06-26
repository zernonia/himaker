<script setup lang="ts">
import { getStripe } from "~~/utils/stripe-client"

const goSuper = async () => {
  console.log("SUPER!!!")
  try {
    const { sessionId } = await $fetch("/api/create-checkout-session", {
      method: "POST",
      body: { price: "price_1LEt2EJvLKxh6TtRISqDgCvj" },
    })
    const stripe = await getStripe()
    stripe?.redirectToCheckout({ sessionId })
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <button
    class="px-3 py-1.5 rounded-lg bg-dark-500 text-white text-[10px] flex items-center space-x-2 font-semibold"
    @click="goSuper"
  >
    <p class="text-xs">🚀</p>
    <p>SUPER</p>
  </button>
</template>
