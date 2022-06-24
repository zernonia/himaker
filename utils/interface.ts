export interface Widget {
  heading: {
    title: string
    headline: string
    name: string
    images: string[]
  }

  links: {
    title: string
    list: {
      icon: string
      title: string
      url: string
    }[]
  }[]

  projects: {
    image: ""
    title: ""
    url: ""
  }[]
}
