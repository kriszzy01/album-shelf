import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

import { axios } from '@/lib/axios'

import { Album, Filters, SortBy } from '../types'

type GetAlbumsParams = {
  sortBy: SortBy | undefined
  filters: Filters
}

const getAlbums = async (
  { sortBy, filters }: GetAlbumsParams,
  page: number
): Promise<Album[]> => {
  const sortParam = sortBy ? `&_sort=${sortBy}` : ''
  const albumNameParam = filters.albumName ? `&q=${filters.albumName}` : ''

  const { data } = await axios.get<Album[]>(
    `/albums?_page=${page || 1}${sortParam}${albumNameParam}`
  )
  return data
}

export const useInfiniteAlbums = (params: GetAlbumsParams) => {
  const observer = useRef<IntersectionObserver>()

  const queryResponse = useInfiniteQuery({
    queryKey: ['albums', params],
    queryFn: ({ pageParam }) => getAlbums(params, pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length < 10 ? false : pages.length + 1
    },
  })

  const { data, hasNextPage, fetchNextPage } = queryResponse

  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (!data) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage({
            pageParam: data.pageParams.length + 1,
          })
        }
      })
      if (node) observer.current.observe(node)
    },
    [data, fetchNextPage, hasNextPage]
  )

  return { ...queryResponse, ref: lastElementRef }
}
