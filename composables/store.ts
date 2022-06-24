import { Widget } from "interface"

export const useWidgetStore = () =>
  useState<Widget>("widget", () => ({
    heading: {
      title: "",
      headline: "",
      name: "",
      images: ["https://avatars.githubusercontent.com/u/59365435?v=4"],
    },
    links: [
      {
        title: "",
        list: [
          {
            icon: "",
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
