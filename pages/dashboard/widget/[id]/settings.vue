<script setup lang="ts">
import LogoSuper from "~~/assets/images/logoSuper.svg"

const widget = useWidgetStore()
const { isSuperUser } = useUserStore()
const { goSuper } = useSuper()
const { settings } = toRefs(widget.value)
</script>

<template>
  <div class="p-6 w-full bg-gray-50 rounded-xl flex flex-col space-y-4 form">
    <button
      v-if="!isSuperUser"
      @click="goSuper"
      class="group relative bg-white hover:bg-primary transition border border-dashed rounded-xl py-16 px-4"
    >
      <div class="text-lg flex flex-col items-center justify-center space-y-4">
        <p class="flex items-center">Go <TagSuper class="mx-2 !text-sm"></TagSuper> to enjoy more features</p>
        <p>Or support first-time Indie Makers 💚</p>
      </div>

      <img
        class="absolute w-32 -top-10 left-4 group-hover:animate-bounce !animate-duration-500 transition"
        :src="LogoSuper"
        alt="Go SUPER!"
      />
    </button>

    <div>
      <div class="flex items-center space-x-4 mb-2">
        <label for="remove_branding">Remove Branding</label>
        <TagSuper></TagSuper>
      </div>
      <InputSwitch :disabled="!isSuperUser" v-model="settings.remove_branding"></InputSwitch>
    </div>

    <!-- <div class="pointer-events-none opacity-30">
      <div class="flex items-center space-x-4 mb-2">
        <label for="remove_branding">Collect feedback</label>
        <TagSuper></TagSuper>
        <p class="text-sm">-- Coming soon --</p>
      </div>
      <InputSwitch v-model="settings.collect_feedback"></InputSwitch>
    </div>

    <div class="pointer-events-none opacity-30">
      <div class="flex items-center space-x-4 mb-2">
        <label for="remove_branding">Analytics</label>
        <TagSuper></TagSuper>
        <p class="text-sm">-- Coming soon --</p>
      </div>
      <InputSwitch v-model="settings.analytics"></InputSwitch>
    </div> -->
  </div>
</template>
