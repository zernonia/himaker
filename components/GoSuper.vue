<script setup lang="ts">
import LogoSuper from "~~/assets/images/logoSuper.svg"
import { getStripe } from "~~/utils/stripe-client"

const { isOpen } = useSuper()
const { isSuperUser } = useUserStore()
const isYearly = ref(false)
const buttonLabel = computed(() => {
  if (isYearly.value) {
    return `Go Super! $30 /year`
  } else {
    return `Go Super! $3 /month`
  }
})

const priceId = computed(() => (isYearly.value ? "price_1LG0TFJvLKxh6TtROkTTOKGM" : "price_1LG0TFJvLKxh6TtRnYhaPa4B"))

const isLoading = ref(false)
const onClick = async () => {
  isLoading.value = true
  try {
    const { sessionId } = await $fetch("/api/create-checkout-session", {
      method: "POST",
      body: { price: priceId.value, redirectTo: window.location.href },
    })
    const stripe = await getStripe()
    stripe?.redirectToCheckout({ sessionId })
  } catch (err) {
    console.log(err)
  }
  isLoading.value = false
}
</script>

<template>
  <Transition name="scale">
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-screen h-screen backdrop-filter backdrop-blur flex items-center justify-center"
      @click.self="isOpen = false"
    >
      <div v-if="isOpen" class="w-screen-sm py-24 px-6 flex flex-col items-center bg-white rounded-4xl shadow-xl">
        <img :src="LogoSuper" alt="go Super!" class="w-28" />
        <h2 class="bg-dark-500 px-6 py-3 rounded-xl text-white text-3xl font-semibold -mt-4">SUPER</h2>

        <div class="flex flex-col items-center" v-if="!isSuperUser">
          <div class="my-8 text-lg flex items-center space-x-4">
            <p class="text-gray-500 transition" :class="{ 'font-semibold text-dark-500': !isYearly }">Monthly</p>
            <InputSwitch v-model="isYearly"></InputSwitch>
            <p class="text-gray-500 transition" :class="{ 'font-semibold text-dark-500': isYearly }">Yearly</p>
          </div>

          <div class="list-none text-lg flex flex-col space-y-1">
            <li class="flex items-center">
              <p class="i-ion-star mr-2"></p>
              Remove branding
            </li>
            <li class="flex items-center">
              <p class="i-ion-star mr-2"></p>
              Analytics
            </li>
            <li class="flex items-center">
              <p class="i-ion-star mr-2"></p>
              Unlimited widget
            </li>
            <li class="flex items-center">
              <p class="i-ion-star mr-2"></p>
              Unlimited users in Widget
            </li>
            <li class="flex items-center">
              <p class="i-ion-star mr-2"></p>
              Unlimited links in Widget
            </li>
            <li class="flex items-center">
              <p class="i-ion-star mr-2"></p>
              Unlimited embed
            </li>
            <li class="flex items-center text-primary-hover">
              <p class="i-ion-heart mr-2"></p>
              Support Indie Maker
            </li>
          </div>

          <Button :loading="isLoading" class="!mt-6 w-64" :label="buttonLabel" @click="onClick"></Button>
        </div>

        <div v-else class="my-8">
          <p class="text-2xl font-semibold">Thanks for supporting! 💚</p>
        </div>
      </div>
    </div>
  </Transition>
</template>
