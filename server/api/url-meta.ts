import parser from "metadata-scraper"

export default defineEventHandler(async (event) => {
  try {
    const { link } = await useBody(event)

    const data = await parser({
      url: link,
      lang: "en-US",
    })

    return data
  } catch (err) {
    console.log(err)
    return err
  }
})
