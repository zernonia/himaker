window.onload = function () {
  const url = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://himaker.io"
  const payload = document.querySelector("[data-widget-id]")
  //@ts-ignore
  const { widgetId, placement } = payload.dataset
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
    overflow: hidden;
} 
.himaker-panel {
    --tw-shadow: 0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);
    bottom: 5rem;
    height: 600px;
    background: white;
    overflow-x: hidden;
    width: 21rem;
    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}
.himaker-panel > div {
  width: 100%;
  height: 100%;
  position: relative;
}
.himaker-panel > div > button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 50%;
  transition: opacity 0.15s ease-in-out;
}
.himaker-panel > div > button:hover {
  opacity: 100%;
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
}
@media screen and (max-width: 426px) { 
  .himaker-trigger { 
    bottom: 0.5rem;  
    left: 0.5rem;  
  }
  .himaker-panel {
    bottom: 0;
    left: 0;
    width: 100vw;
    min-height: -webkit-fill-available;
    z-index: 100000000;
  }
 }`

  // Setup DOM
  const container = document.createElement("div")
  container.classList.add("himaker-container")

  const containerButton = document.createElement("div")
  const containerButtonTrigger = document.createElement("button")
  containerButton.classList.add("himaker-trigger")
  containerButton.append(constructIframe(`${url}/widget/trigger?${searchParams}`))
  containerButton.append(containerButtonTrigger)

  const containerCloseButton = document.createElement("button")
  containerCloseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="currentColor" d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"></path></svg>`
  containerCloseButton.onclick = () => {
    closePanel()
  }

  const containerPanel = document.createElement("div")
  containerPanel.style.display = "none"
  containerPanel.style.transform = "translateY(50px)"
  containerPanel.classList.add("himaker-panel")
  const wrapper = document.createElement("div")
  wrapper.append(containerCloseButton)
  wrapper.append(constructIframe(`${url}/widget/panel?${searchParams}`))
  containerPanel.append(wrapper)

  container.append(style)
  container.append(containerPanel)
  container.append(containerButton)

  document.body.append(container)

  let isOpen = false
  containerButtonTrigger.onclick = () => {
    if (isOpen) {
      closePanel()
    } else {
      openPanel()
    }
  }

  document.onclick = (event) => {
    let el = event.target as Element
    if (el !== containerButtonTrigger) {
      closePanel()
    }
  }

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
}
