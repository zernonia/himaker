;(function () {
  var url = "https://himaker.io"
  var payload = document.querySelector("[data-widget-id]")
  //@ts-ignore
  var _a = payload.dataset,
    widgetId = _a.widgetId,
    placement = _a.placement
  if (!widgetId) return
  //@ts-ignore
  var searchParams = new URLSearchParams(payload.dataset)
  var constructIframe = function (src) {
    var iframe = document.createElement("iframe")
    iframe.width = "100%"
    iframe.height = "100%"
    iframe.src = src
    return iframe
  }
  var style = document.createElement("style")
  style.innerHTML =
    ".himaker-panel, .himaker-trigger {\n    border-radius: 10.5px;\n    box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);\n    left: 14px;\n    position: fixed;\n    overflow: hidden;\n    z-index: 99999999;\n} \n.himaker-panel {\n    --tw-shadow: 0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px 6px rgb(0 0 0/0.1);\n    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);\n    bottom: 70px;\n    height: 600px;\n    background: white;\n    overflow-x: hidden;\n    width: 294px;\n    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;\n}\n.himaker-panel > div {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.himaker-panel > div > button {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  opacity: 50%;\n  transition: opacity 0.15s ease-in-out;\n}\n.himaker-panel > div > button:hover {\n  opacity: 100%;\n}\n.himaker-trigger {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);\n  bottom: 14px;\n  cursor: pointer;\n  height: 42px;\n  overflow: hidden;\n  width: 168px; \n  background: white;\n}\n.himaker-trigger button {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top:0;\n  left:0;\n}\n@media screen and (max-width: 426px) { \n  .himaker-trigger { \n    bottom: 7px;  \n    left: 7px;  \n  }\n  .himaker-panel {\n    bottom: 0;\n    left: 0;\n    width: 100vw;\n    min-height: -webkit-fill-available;\n    z-index: 100000000;\n  }\n }"
  // Setup DOM
  var container = document.createElement("div")
  container.classList.add("himaker-container")
  var containerButton = document.createElement("div")
  var containerButtonTrigger = document.createElement("button")
  containerButton.classList.add("himaker-trigger")
  containerButton.append(constructIframe(url + "/widget/trigger?" + searchParams))
  containerButton.append(containerButtonTrigger)
  var containerCloseButton = document.createElement("button")
  containerCloseButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="currentColor" d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"></path></svg>'
  containerCloseButton.onclick = function () {
    closePanel()
  }
  var containerPanel = document.createElement("div")
  containerPanel.style.display = "none"
  containerPanel.style.transform = "translateY(50px)"
  containerPanel.classList.add("himaker-panel")
  var containerPanelIframe = constructIframe(url + "/widget/panel?" + searchParams)
  var wrapper = document.createElement("div")
  wrapper.append(containerCloseButton)
  wrapper.append(containerPanelIframe)
  containerPanel.append(wrapper)
  container.append(style)
  container.append(containerPanel)
  container.append(containerButton)
  document.body.append(container)
  var isOpen = false
  containerButtonTrigger.onclick = function () {
    if (isOpen) {
      closePanel()
    } else {
      openPanel()
    }
  }
  document.onclick = function (event) {
    var el = event.target
    if (el !== containerButtonTrigger) {
      closePanel()
    }
  }
  var s = { insideIframe: false, scrollX: 0, scrollY: 0 }
  containerPanelIframe.addEventListener("mouseenter", function () {
    s.insideIframe = true
    s.scrollX = window.scrollX
    s.scrollY = window.scrollY
  })
  containerPanelIframe.addEventListener("mouseleave", function () {
    s.insideIframe = false
  })
  document.addEventListener("scroll", function () {
    if (s.insideIframe) window.scrollTo(s.scrollX, s.scrollY)
  })
  var openPanel = function () {
    isOpen = true
    containerPanel.style.display = "block"
    setTimeout(function () {
      containerPanel.style.opacity = "1"
      containerPanel.style.transform = "translateY(0px)"
    }, 0)
  }
  var closePanel = function () {
    isOpen = false
    containerPanel.style.opacity = "0"
    containerPanel.style.transform = "translateY(50px)"
    setTimeout(function () {
      containerPanel.style.display = "none"
    }, 150)
  }
})()
