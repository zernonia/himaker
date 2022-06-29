export const useCustomHead = (title: string, description?: string, image?: string) => {
  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description ?? "Easily show your social links, projects, or any links with your audience.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@zernonia" },
      { name: "twitter:title", content: `${title} | Hi Maker 👋🏻 ` },
      {
        name: "twitter:description",
        content: description ?? "Easily show your social links, projects, or any links with your audience.",
      },
      { name: "twitter:image", content: image ?? "https://himaker.io/og.png" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: `${title} | Hi Maker 👋🏻 ` },
      { property: "og:url", content: "https://himaker.io" },
      { property: "og:image", content: image ?? "https://himaker.io/og.png" },
      {
        property: "og:description",
        content: description ?? "Easily show your social links, projects, or any links with your audience.",
      },
    ],
  })
}
