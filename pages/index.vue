<script setup lang="ts">
import Logo from "~~/assets/images/logo.svg"
import LogoSuper from "~~/assets/images/logoSuper.svg"
</script>

<template>
  <div>
    <section class="py-16 md:py-32 flex flex-col items-center">
      <h1 class="text-4xl sm:text-6xl text-center font-semibold">
        Embed & Showcase <br />
        your projects on websites
      </h1>
      <p class="max-w-94 md:w-114 py-8 text-center text-primary font-semibold text-xl sm:text-2xl">
        Easily share your social link, project, or any link with your visitors
      </p>

      <NuxtLink to="/login" class="group relative">
        <img
          class="absolute left-0 top-0 h-12 transition-all transform rotate-0 group-hover:-top-6 group-hover:-left-6 group-hover:-rotate-15"
          :src="Logo"
          alt="HiMaker logo"
        />
        <Button label="Give it a try" class="!sm:text-xl p-button-secondary"></Button>
      </NuxtLink>
    </section>

    <section class="py-16 flex flex-col items-center">
      <h2 class="text-3xl sm:text-4xl font-semibold text-dark-500 flex items-center">Features ✨</h2>
      <div class="flex flex-col-reverse md:flex-row items-center mt-6 md:mt-12">
        <div class="text-center md:text-left">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-300">01. Embed Widget</h2>
          <p class="max-w-80 text-lg mt-4">Embed the widget on your website easily by simply adding 1 line of code</p>
        </div>
        <img
          class="px-12 md:px-0 mb-6 md:mb-0 md:ml-6"
          src="~/assets/images/landing/embed-website.png"
          alt="embed widget in your website"
        />
      </div>
      <div class="flex flex-col md:flex-row items-center mt-12">
        <img
          class="px-12 md:px-0 mb-6 md:mb-0 md:mr-12"
          src="~/assets/images/landing/social-links.png"
          alt="share your social links and projects"
        />
        <div class="text-center md:text-left">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-300">02. Social Links & Projects</h2>
          <p class="mx-auto max-w-80 text-lg mt-4">
            Share your social and project for your audience to easily follow you and your work!
          </p>
        </div>
      </div>
      <div class="flex flex-col-reverse md:flex-row items-center mt-12">
        <div class="text-center md:text-left">
          <h2 class="text-2xl sm:text-3xl font-semibold text-gray-300">03. Customization</h2>
          <p class="max-w-80 text-lg mt-4">Everybody loves customization, you can easily customize it to your liking</p>
        </div>
        <img
          class="px-12 md:px-0 mb-6 md:mb-0 md:ml-12"
          src="~/assets/images/landing/customize.png"
          alt="customize the widget that suits your branding"
        />
      </div>
    </section>

    <section class="py-16 flex flex-col items-center">
      <h2 class="text-3xl sm:text-4xl font-semibold text-gray-300 flex items-center">
        <img :src="Logo" alt="HiMaker logo" class="w-12 mr-4" />
        Made for ...
      </h2>
      <LandingSlider></LandingSlider>

      <NuxtLink to="/login" class="mt-16 group relative">
        <img
          class="absolute left-0 top-0 h-12 transition-all transform rotate-0 group-hover:-top-6 group-hover:-left-6 group-hover:-rotate-15"
          :src="Logo"
          alt="HiMaker logo"
        />
        <Button label="Give it a try" class="!sm:text-xl p-button-secondary"></Button>
      </NuxtLink>
    </section>

    <section class="py-16 flex flex-col items-center">
      <h2 class="text-3xl sm:text-4xl font-semibold text-dark-500 flex items-center">Pricing</h2>
      <div
        class="mt-8 flex flex-col sm:flex-row items-center p-4 sm:p-8 md:p-16 rounded-4xl bg-primary w-full space-y-4 sm:space-y-0 sm:space-x-6"
      >
        <div
          class="w-full sm:w-1/2 group flex flex-col items-center p-6 md:p-10 border-4 bg-white rounded-3xl border-transparent"
        >
          <div class="flex flex-col items-center">
            <img :src="Logo" alt="free plan logo" class="w-28" />
            <h3 class="px-6 py-3 rounded-xl text-3xl font-semibold w-max">Free</h3>
          </div>
          <div class="mt-10 list-none text-lg flex flex-col space-y-1">
            <li class="flex items-center">
              <p class="i-ion-md-arrow-dropright text-2xl mr-2"></p>
              up to 3 widgets
            </li>
            <li class="flex items-center">
              <p class="i-ion-md-arrow-dropright text-2xl mr-2"></p>
              up to 3 users in Widget
            </li>
            <li class="flex items-center">
              <p class="i-ion-md-arrow-dropright text-2xl mr-2"></p>
              up to 10 links in Widget
            </li>
          </div>
        </div>

        <div
          class="w-full sm:w-1/2 group flex flex-col items-center p-6 md:p-10 border-4 border-dark-500 bg-white rounded-3xl"
        >
          <div class="flex flex-col items-center">
            <img
              :src="LogoSuper"
              alt="go Super!"
              class="w-28 group-hover:animate-bounce !animate-duration-500 transition"
            />
            <h3 class="bg-dark-500 px-6 py-3 rounded-xl text-white text-3xl font-semibold -mt-4 w-max">SUPER</h3>
          </div>
          <div class="mt-10 list-none text-lg flex flex-col space-y-1">
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
              Unlimited widgets
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
              <p class="i-ion-heart text-xl mr-2"></p>
              Support Indie Maker
            </li>
          </div>
        </div>
      </div>
    </section>

    <section
      class="py-16 flex flex-col-reverse sm:flex-row items-center sm:items-start sm:space-x-12 mx-auto text-dark-500 !max-w-screen-md"
    >
      <div class="sm:text-lg text-center sm:text-left">
        <h4 class="text-gray-300 text-3xl sm:text-4xl font-semibold">Hi Maker!</h4>
        <p class="mt-4">I'm Zernonia, the maker of HiMaker!</p>
        <br />
        <p>
          There are tons of Linktree/Biolink kind of website that allow people on the internet to follow the you easily,
          but I wanted more than that! I wanted to share my social links, and showcase my project all everywhere. Thus
          I've created <strong>HiMaker!</strong>
        </p>
        <br />

        <p>
          HiMaker allow <strong>IndieHackers, Developers or Content Creator</strong> like you to easily create their
          social links, and showcase their project on any website they wanted! HiMaker is aim to increase your
          publicity, your projects' publicity and increase engagement with your audience.
        </p>
        <br />

        <p>Check out my project by clicking the button on the bottom-left corner 😁</p>
      </div>
      <div class="flex-shrink-0 w-64 h-86 mb-12 sm:mb-0">
        <img class="rounded-2xl w-full h-full object-cover" src="~/assets/images/maker.png" alt="maker - zernonia" />
      </div>
    </section>
  </div>
</template>
