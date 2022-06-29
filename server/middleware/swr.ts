export default defineEventHandler(async (event) => {
  let url = event.req.url
  console.log(url)
  if (url.includes("/widget/")) {
    // cache 1mins
    event.res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate")
  } else if (url.includes("/dashboard")) {
  } else {
    event.res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate")
  }
})
