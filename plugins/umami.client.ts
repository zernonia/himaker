import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(() => {
  if (window.location.pathname.includes("widget")) return
  const { path } = toRefs(useRoute())

  const moduleOptions = {
    scriptUrl: "https://umami-zernonia.vercel.app/umami.js",
    websiteId: "c15495a8-5372-4884-a170-b4d2365e3088",
    domains: "himaker.io,www.himaker.io",
  }
  const options = { ...moduleOptions }

  const umamiScript = constructScript(options)
  const head = document.head || document.getElementsByTagName("head")[0]

  watch(
    path,
    (n) => {
      if (n.includes("widget")) {
        if (head.querySelector("#umami")) {
          head.removeChild(umamiScript)
        }
      } else {
        if (head.querySelector("#umami")) return
        head.appendChild(umamiScript)
      }
    },
    { immediate: true }
  )
})

function constructScript(options: any) {
  const script = document.createElement("script")

  script.id = "umami"
  script.async = true
  script.defer = true
  script.dataset.websiteId = options.websiteId
  script.dataset.domains = options.domains
  script.src = options.scriptUrl

  return script
}
