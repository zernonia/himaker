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
    bg_primary: "#FFF7ED",
    text_primary: "#F97317",
    text_secondary: "#F97317",
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
