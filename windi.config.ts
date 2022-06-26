import { defineConfig } from "windicss/helpers"

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

export default defineConfig({
  safelist: [range(10).map((i) => `-ml-${1 + i * 3}`)],
  theme: {
    extend: {
      colors: {
        primary: "#00ddb3",
        "primary-hover": "#00c29d",
      },
      screens: {
        xs: "425px",
      },
    },
  },
})
