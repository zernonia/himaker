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
    image: string
    title: string
    url: string
  }[]

  style: {
    dark_mode: boolean
    bg_primary: string
    text_primary: string
    text_secondary: string
  }
}

export interface WidgetInfo {
  id: string
  created_at: Date
  payload: Widget
}
