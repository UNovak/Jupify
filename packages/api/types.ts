export type ScrapedData = {
  title: string
  voted: string
  status: string
  result: string
  start: string
  end: string
}

export type DecodedToken = {
  email: string
  exp?: number
}

export type Subscriber = {
  email: string
  unsubscribe_token: string
}

export type BulkResponse = {
  status: number
  message: string
  bulk_id?: string
}

export type Vote = {
  id: number
  title: string
  start?: string
  end?: string
  notified?: number
  people_notified?: number
}

export type Response<T = void> = {
  success: boolean // Indicates success or failure
  data?: T // Resulting data, if any
  error?: string // Error message, if any
}
