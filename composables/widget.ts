import { Widget, WidgetInfo } from "interface"

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
      image: "https://himaker.io/og.png",
      title: "Your website",
      url: "https://himaker.io/",
    },
  ],
  style: {
    dark_mode: false,
    bg_primary: "#181411",
    text_primary: "#00ddb3",
    text_secondary: "#ffffff",
  },
  settings: {
    remove_branding: false,
    collect_feedback: false,
    analytics: false,
  },
}

export const useWidgetStore = () => useState<Widget>("widget", () => initialState)
export const useWidgetListStore = () => useState<WidgetInfo[]>("widget-list", () => [])

export const useWidgetClear = () => {
  const widget = useWidgetStore()

  const clear = () => {
    Object.assign(widget.value, initialState)
  }
  return {
    clear,
  }
}
