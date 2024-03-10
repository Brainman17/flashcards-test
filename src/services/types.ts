import { Deck, Pagination } from '@/services/decks/decks.types'

export type PaginatedEntity<T> = {
  items: T[]
  pagination: Pagination
}

export type DecksResponse = PaginatedEntity<Deck> & {
  maxCardsCount: number
}

export type CreateTypeArgs = {
  name: string
}
