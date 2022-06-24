import { defineConfig } from "windicss/helpers"

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

export default defineConfig({
  safelist: [
    range(20).map((i) => `-ml-${i}`), // mt-1 to mt-10
  ],
})
