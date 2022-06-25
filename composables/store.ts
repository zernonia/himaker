import { Widget } from "interface"

export const useWidgetStore = () =>
  useState<Widget>("widget", () => ({
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
            title: "",
            url: "",
          },
        ],
      },
    ],
    projects: [
      {
        image: "",
        title: "",
        url: "",
      },
    ],
    style: {
      dark_mode: false,
      bg_primary: "#FFF7ED",
      text_primary: "#F97317",
      text_secondary: "#F97317",
    },
  }))
