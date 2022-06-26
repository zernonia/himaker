import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(() => {
  const moduleOptions = {
    scriptUrl: "https://umami-zernonia.vercel.app/umami.js",
    websiteId: "c15495a8-5372-4884-a170-b4d2365e3088",
    domains: "himaker.io,www.himaker.io",
  }
  const options = { ...moduleOptions }

  loadScript(options)
})

function loadScript(options: any) {
  if (window.location.pathname.includes("widget")) return

  const head = document.head || document.getElementsByTagName("head")[0]
  const script = document.createElement("script")

  script.async = true
  script.defer = true
  script.dataset.websiteId = options.websiteId
  script.dataset.domains = options.domains
  script.src = options.scriptUrl

  head.appendChild(script)
}
