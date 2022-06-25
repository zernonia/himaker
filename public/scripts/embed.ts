window.onload = function () {
  console.log("hi")
  const loc = location.href
  if (loc.includes("widget")) return
  let boopElement = document.querySelectorAll("[data-boop-ink]")
  if (!boopElement) return
  let isOpen = false

  let iframe = document.createElement("iframe")
  iframe.style.display = "none"
  iframe.style.opacity = "0"
  iframe.style.position = "absolute"
  iframe.style.top = "0"
  iframe.style.left = "0"
  iframe.style.margin = "0"
  iframe.style.zIndex = "99999"
  iframe.style.borderRadius = "16px"
  iframe.style.boxShadow = "rgb(0 0 0 / 20%) 0px 18px 50px -10px"
  iframe.style.transition = "opacity 150ms ease-in-out 0s"
  iframe.width = "320"
  iframe.height = "300"
  iframe.src = "http://localhost:3000/widget?id=123"
  // document.body.appendChild(iframe)

  window.addEventListener("message", (ev) => {
    if (ev.data.boop) {
      console.log(ev)
    }
  })

  const toggleBoopEl = (ev?: MouseEvent) => {
    isOpen = !isOpen
    if (isOpen) {
      if (!ev) return
      let boopEl = ev.target as HTMLElement

      let { offsetLeft, offsetTop, offsetHeight, offsetWidth } = boopEl
      iframe.style.transform = `translate(${offsetLeft - offsetWidth}px, ${offsetTop + offsetHeight}px)`
      iframe.style.display = "block"

      setTimeout(() => {
        iframe.style.opacity = "1"
      }, 0)
    } else {
      iframe.style.opacity = "0"
      setTimeout(() => {
        iframe.style.display = "none"
      }, 150)
    }
  }

  const checkClickOutside = (event: MouseEvent) => {
    let el = event.target as Element
    if (!Array.from(boopElement).includes(el)) {
      if (isOpen) {
        toggleBoopEl()
      }
    }
  }

  if (boopElement.length) {
    document.addEventListener("click", checkClickOutside)
    //@ts-ignore
    Array.from(boopElement).forEach((el) => el.addEventListener("click", toggleBoopEl))
  }
}
