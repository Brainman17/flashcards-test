import { Deck } from '@/services/decks/decks.types'
import { CreateTypeArgs, DecksResponse } from '@/services/types'

import { baseApi } from '../../services/base-api'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDecks: builder.mutation<Deck, CreateTypeArgs>({
        invalidatesTags: ['Decks'],
        query: ({ name }) => {
          return {
            body: { name },
            method: 'POST',
            url: 'v1/decks',
          }
        },
      }),
      getDecks: builder.query<DecksResponse, Partial<GetDecksArgs>>({
        providesTags: ['Decks'],
        query: args => {
          return {
            method: 'GET',
            params: args,
            url: `v1/decks`,
          }
        },
      }),
    }
  },
})

type GetDecksArgs = {
  authorId: string
  currentPage: number
  itemsPerPage: number
  maxCardsCount: number
  minCardsCount: number
  name: string
  orderBy: string
} // все параметры необязательные

export const { useCreateDecksMutation, useGetDecksQuery, useLazyGetDecksQuery } = decksApi
