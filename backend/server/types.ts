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
