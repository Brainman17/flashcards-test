import { useState } from 'react'

import { useCreateDecksMutation, useGetDecksQuery } from '../../services/decks'
import { decksSlice } from '../../services/decks/decks.slice'
import { useAppDispatch, useAppSelector } from '../../services/store'

export const Decks = () => {
  const [cardName, setCardName] = useState('')

  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const [skip, setSkip] = useState(true)

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))

  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))

  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const { data, isLoading } = useGetDecksQuery(
    { currentPage: currentPage, itemsPerPage: itemsPerPage, name: searchByName },
    {
      skip: skip, // skip также юзается как useLazyGetDecksQuery только чаще
    }
  )

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDecksMutation()
  const handleCreateClicked = () => createDeck({ name: cardName })
  // const [initializeQuery, result] = useLazyGetDecksQuery()

  const initializeQuery = () => {
    setSkip(false)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setItemsPerPage(10)
          }}
        >
          itemsPerPage: 10
        </button>
        <button
          onClick={() => {
            setItemsPerPage(20)
          }}
        >
          itemsPerPage: 20
        </button>
        <button
          onClick={() => {
            setItemsPerPage(30)
          }}
        >
          itemsPerPage: 30
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setCurrentPage(1)
          }}
        >
          currentPage: 1
        </button>
        <button
          onClick={() => {
            setCurrentPage(2)
          }}
        >
          currentPage: 2
        </button>
        <button
          onClick={() => {
            setCurrentPage(3)
          }}
        >
          currentPage: 3
        </button>
      </div>
      <input
        onChange={e => {
          setSearch(e.target.value)
        }}
      />
      <button onClick={() => initializeQuery()}>Fetch</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Updated</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.items.map(deck => (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{new Date(deck.updated).toLocaleDateString('en-Gb')}</td>
                <td>{deck.author.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleCreateClicked}>Create Deck</button>
      isCreateDeckLoading: {isCreateDeckLoading.toString()}
      <input onChange={e => setCardName(e.target.value)} value={cardName} />
    </div>
  )
}
