export default defineEventHandler(async (event) => {
  let url = event.req.url
  console.log(url)
  if (url.includes("/widget/")) {
    // cache 15mins
    event.res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate")
  } else if (url) {
  }
})
