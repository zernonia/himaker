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
            icon: "github",
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
  }))
