export const useCustomHead = (title: string, description?: string, image?: string) => {
  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description ?? "Embed beautiful widget on your website to introduce yourself and your masterpiece",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@zernonia" },
      { name: "twitter:title", content: title },
      {
        name: "twitter:description",
        content: description ?? "Embed beautiful widget on your website to introduce yourself and your masterpiece",
      },
      { name: "twitter:image", content: image ?? "https://himaker.io/og.png" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:url", content: "https://himaker.io" },
      { property: "og:image", content: image ?? "https://himaker.io/og.png" },
      {
        property: "og:description",
        content: description ?? "Embed beautiful widget on your website to introduce yourself and your masterpiece",
      },
    ],
  })
}
