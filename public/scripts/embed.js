window.onload = function () {
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
    style.innerHTML = ".himaker-panel, .himaker-trigger {\n    border-radius: 0.75rem;\n    box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);\n    left: 1rem;\n    position: fixed;\n    overflow: hidden;\n} \n.himaker-panel {\n    --tw-shadow: 0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1);\n    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);\n    bottom: 5rem;\n    height: 600px;\n    overflow-x: hidden;\n    width: 21rem;\n    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;\n}\n.himaker-trigger {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);\n  bottom: 1rem;\n  cursor: pointer;\n  height: 3rem;\n  overflow: hidden;\n  width: 12rem; \n}\n.himaker-trigger button {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top:0;\n  left:0;\n}";
    // Setup DOM
    var container = document.createElement("div");
    container.classList.add("himaker-container");
    var containerButton = document.createElement("div");
    var containerButtonTrigger = document.createElement("button");
    containerButton.classList.add("himaker-trigger");
    containerButton.append(constructIframe("http://localhost:3000/widget/trigger?" + searchParams));
    containerButton.append(containerButtonTrigger);
    var containerPanel = document.createElement("div");
    containerPanel.style.display = "none";
    containerPanel.style.transform = "translateY(50px)";
    containerPanel.classList.add("himaker-panel");
    containerPanel.append(constructIframe("http://localhost:3000/widget/panel?" + searchParams));
    container.append(style);
    container.append(containerPanel);
    container.append(containerButton);
    document.body.append(container);
    var isOpen = false;
    containerButtonTrigger.addEventListener("click", function () {
        if (isOpen) {
            closePanel();
        }
        else {
            openPanel();
        }
    });
    document.addEventListener("click", function (ev) {
        var el = event.target;
        if (el !== containerButtonTrigger) {
            closePanel();
        }
    });
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
