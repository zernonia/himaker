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

  settings: {
    remove_branding: boolean
    collect_feedback: boolean
    analytics: boolean
  }
}

export interface WidgetInfo {
  id: string
  user_id?: string
  created_at: Date
  payload: Widget
  users?: Users
}

export interface Product {
  id: string /* primary key */
  active?: boolean
  name?: string
  description?: string
  image?: string
  metadata?: any // type unknown;
}

export interface Users {
  id: string /* primary key */
  full_name?: string
  avatar_url?: string
  billing_address?: any // type unknown;
  payment_method?: any // type unknown;
  subscription?: Subscription
}

export interface Customer {
  id: string /* primary key */
  stripe_customer_id?: string
}

export interface Price {
  id: string /* primary key */
  product_id?: string /* foreign key to products.id */
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: any // type unknown;
  interval?: any // type unknown;
  interval_count?: any // type unknown;
  trial_period_days?: any // type unknown;
  metadata?: any // type unknown;
  products?: Product
}

export interface Subscription {
  id: string /* primary key */
  user_id: string
  status?: any // type unknown;
  metadata?: any // type unknown;
  price_id?: string /* foreign key to price.id */
  quantity?: any // type unknown;
  cancel_at_period_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  price?: Price
}

export interface Widgets {
  id: string /* primary key */
  user_id?: string /* foreign key to users.id */
  payload?: any // type unknown;
  created_at?: string
  users?: Users
}
