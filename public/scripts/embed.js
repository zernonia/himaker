window.onload = function () {
    var url = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://himaker.io";
    var payload = document.querySelector("[data-widget-id]");
    //@ts-ignore
    var _a = payload.dataset, widgetId = _a.widgetId, placement = _a.placement;
    if (!widgetId)
        return;
    //@ts-ignore
    var searchParams = new URLSearchParams(payload.dataset);
    var constructIframe = function (src) {
        var iframe = document.createElement("iframe");
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.src = src;
        return iframe;
    };
    var style = document.createElement("style");
    style.innerHTML = ".himaker-panel, .himaker-trigger {\n    border-radius: 0.75rem;\n    box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);\n    left: 1rem;\n    position: fixed;\n    overflow: hidden;\n} \n.himaker-panel {\n    --tw-shadow: 0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1);\n    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);\n    bottom: 5rem;\n    height: 600px;\n    background: white;\n    overflow-x: hidden;\n    width: 21rem;\n    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;\n}\n.himaker-panel > div {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.himaker-panel > div > button {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  opacity: 50%;\n  transition: opacity 0.15s ease-in-out;\n}\n.himaker-panel > div > button:hover {\n  opacity: 100%;\n}\n.himaker-trigger {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);\n  bottom: 1rem;\n  cursor: pointer;\n  height: 3rem;\n  overflow: hidden;\n  width: 12rem; \n}\n.himaker-trigger button {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top:0;\n  left:0;\n}\n@media screen and (max-width: 426px) { \n  .himaker-trigger { \n    bottom: 0.5rem;  \n    left: 0.5rem;  \n  }\n  .himaker-panel {\n    bottom: 0;\n    left: 0;\n    width: 100vw;\n    min-height: -webkit-fill-available;\n    z-index: 100000000;\n  }\n }";
    // Setup DOM
    var container = document.createElement("div");
    container.classList.add("himaker-container");
    var containerButton = document.createElement("div");
    var containerButtonTrigger = document.createElement("button");
    containerButton.classList.add("himaker-trigger");
    containerButton.append(constructIframe(url + "/widget/trigger?" + searchParams));
    containerButton.append(containerButtonTrigger);
    var containerCloseButton = document.createElement("button");
    containerCloseButton.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--ion\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z\"></path></svg>";
    containerCloseButton.onclick = function () {
        closePanel();
    };
    var containerPanel = document.createElement("div");
    containerPanel.style.display = "none";
    containerPanel.style.transform = "translateY(50px)";
    containerPanel.classList.add("himaker-panel");
    var wrapper = document.createElement("div");
    wrapper.append(containerCloseButton);
    wrapper.append(constructIframe(url + "/widget/panel?" + searchParams));
    containerPanel.append(wrapper);
    container.append(style);
    container.append(containerPanel);
    container.append(containerButton);
    document.body.append(container);
    var isOpen = false;
    containerButtonTrigger.onclick = function () {
        if (isOpen) {
            closePanel();
        }
        else {
            openPanel();
        }
    };
    document.onclick = function (event) {
        var el = event.target;
        if (el !== containerButtonTrigger) {
            closePanel();
        }
    };
    var openPanel = function () {
        isOpen = true;
        containerPanel.style.display = "block";
        setTimeout(function () {
            containerPanel.style.opacity = "1";
            containerPanel.style.transform = "translateY(0px)";
        }, 0);
    };
    var closePanel = function () {
        isOpen = false;
        containerPanel.style.opacity = "0";
        containerPanel.style.transform = "translateY(50px)";
        setTimeout(function () {
            containerPanel.style.display = "none";
        }, 150);
    };
};
