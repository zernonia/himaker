window.onload = function () {
  const payload = document.querySelector("[data-widget-id]")
  //@ts-ignore
  const { widgetId, placement } = payload.dataset
  console.log({ widgetId, placement })
  if (!widgetId) return
  //@ts-ignore
  const searchParams = new URLSearchParams(payload.dataset)
  const constructIframe = (src: string) => {
    let iframe = document.createElement("iframe")
    iframe.width = "100%"
    iframe.height = "100%"
    iframe.src = src

    return iframe
  }

  const style = document.createElement("style")
  style.innerHTML = `.himaker-panel, .himaker-trigger {
    border-radius: 0.75rem;
    box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
    left: 1rem;
    position: fixed;
} 
.himaker-panel {
    --tw-shadow: 0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);
    bottom: 5rem;
    height: 600px;
    overflow-x: hidden;
    width: 21rem;
    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}
.himaker-trigger {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);
  bottom: 1rem;
  cursor: pointer;
  height: 3rem;
  overflow: hidden;
  width: 12rem; 
}
.himaker-trigger button {
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
}`

  // Setup DOM
  const container = document.createElement("div")
  container.classList.add("himaker-container")

  const containerButton = document.createElement("div")
  const containerButtonTrigger = document.createElement("button")
  containerButton.classList.add("himaker-trigger")
  containerButton.append(constructIframe(`http://localhost:3000/widget/trigger?${searchParams}`))
  containerButton.append(containerButtonTrigger)

  const containerPanel = document.createElement("div")
  containerPanel.style.display = "none"
  containerPanel.style.transform = "translateY(50px)"
  containerPanel.classList.add("himaker-panel")
  containerPanel.append(constructIframe(`http://localhost:3000/widget/panel?${searchParams}`))

  container.append(style)
  container.append(containerPanel)
  container.append(containerButton)

  document.body.append(container)

  let isOpen = false
  containerButtonTrigger.addEventListener("click", () => {
    if (isOpen) {
      closePanel()
    } else {
      openPanel()
    }
  })

  document.addEventListener("click", (ev) => {
    let el = event.target as Element
    if (el !== containerButtonTrigger) {
      closePanel()
    }
  })

  const openPanel = () => {
    isOpen = true
    containerPanel.style.display = "block"
    setTimeout(() => {
      containerPanel.style.opacity = "1"
      containerPanel.style.transform = "translateY(0px)"
    }, 0)
  }
  const closePanel = () => {
    isOpen = false
    containerPanel.style.opacity = "0"
    containerPanel.style.transform = "translateY(50px)"
    setTimeout(() => {
      containerPanel.style.display = "none"
    }, 150)
  }

  // document.body.appendChild(iframe)

  // const toggleBoopEl = (ev?: MouseEvent) => {
  //   isOpen = !isOpen
  //   if (isOpen) {
  //     if (!ev) return
  //     let boopEl = ev.target as HTMLElement

  //     let { offsetLeft, offsetTop, offsetHeight, offsetWidth } = boopEl
  //     iframe.style.transform = `translate(${offsetLeft - offsetWidth}px, ${offsetTop + offsetHeight}px)`
  //     iframe.style.display = "block"

  //     setTimeout(() => {
  //       iframe.style.opacity = "1"
  //     }, 0)
  //   } else {
  //     iframe.style.opacity = "0"
  //     setTimeout(() => {
  //       iframe.style.display = "none"
  //     }, 150)
  //   }
  // }

  // const checkClickOutside = (event: MouseEvent) => {
  //   let el = event.target as Element
  //   if (containerButton == el) {
  //     if (isOpen) {
  //       // toggleBoopEl()
  //     }
  //   }
  // }

  // if (containerButton.length) {
  //   document.addEventListener("click", checkClickOutside)
  //   //@ts-ignore
  //   Array.from(containerButton).forEach((el) => el.addEventListener("click", toggleBoopEl))
  // }
}
