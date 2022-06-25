import { Widget } from "interface"

const initialState: Widget = {
  heading: {
    title: "",
    headline: "",
    name: "",
    images: [""],
  },
  links: [
    {
      title: "",
      list: [
        {
          icon: "link",
          title: "Website",
          url: "https://hiMaker.io",
        },
      ],
    },
  ],
  projects: [
    {
      image: "https://zernonia.com/og.png",
      title: "Your website",
      url: "https://zernonia.com/",
    },
  ],
  style: {
    dark_mode: false,
    bg_primary: "#181411",
    text_primary: "#701bee",
    text_secondary: "#ffffff",
  },
}

export const useWidgetStore = () => useState<Widget>("widget", () => initialState)

export const useWidgetClear = () => {
  const widget = useWidgetStore()

  const clear = () => {
    widget.value = initialState
  }
  return {
    clear,
  }
}
