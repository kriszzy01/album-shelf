import { useRef, useState } from 'react'
import 'intersection-observer' //pollyfill for intersection observer

import { useInfiniteAlbums } from './api'
import { Filters, SortBy } from './types'

import { Album } from './components/Album'
import { AlbumSkeleton } from './components/AlbumSkeleton'
import { EmptyState } from './components/EmptyState'
import { Sort } from './components/Sort'
import { ShelfFilters } from './components/ShelfFilters'

const DEFAULT_FILTERS: Filters = { albumName: '' }

const AlbumShelf = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null!)

  const [sortBy, setSortBy] = useState<SortBy | undefined>(undefined)
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  const { ref, data, isInitialLoading, isFetchingNextPage } = useInfiniteAlbums(
    {
      sortBy,
      filters,
    }
  )

  const handleApplySortBy = (sortBy: SortBy) => {
    setSortBy((previousSortBy) => {
      return previousSortBy === sortBy ? undefined : sortBy
    })
    scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleApplyFilters = (filter: Partial<Filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }))
    scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const albums = data?.pages.flat() || []

  return (
    <div className="h-screen bg-gray-50 flex flex-col lg:flex-row overflow-hidden">
      <aside className="bg-grey-extraLight top-0 p-6 shrink-0 lg:p-9 lg:w-[411px] flex flex-col justify-between">
        <div>
          <h1 className="text-xl text-primary-dark font-extrabold font-sans-extrabold leading-[69.67px]">
            Album Shelf
          </h1>
          <ShelfFilters onApplyFilter={handleApplyFilters} />
          <Sort selectedSortBy={sortBy} onApplySortBy={handleApplySortBy} />
        </div>

        <p className="text-medium text-lg text-grey-medium font-sans-medium leading-[24.59px]">
          {albums.length} albums listed
        </p>
      </aside>

      <main
        ref={scrollContainerRef}
        className="grow p-6 lg:p-9 overflow-y-scroll bg-grey-light h-full"
      >
        {albums.length || isInitialLoading ? (
          <ul className="gap-[23px] justify-center grid grid-cols-shelf lg:gap-9 lg:grid-cols-shelf-lg xl:gap-8 relative">
            {albums.map((album, index) => {
              const lastElement = albums.length === index + 1

              return (
                <li
                  tabIndex={0}
                  key={album.id}
                  ref={lastElement ? ref : undefined}
                  className="w-fit rounded"
                  data-testid={lastElement ? 'lastElement' : undefined}
                >
                  <Album {...album} />
                </li>
              )
            })}

            {(isFetchingNextPage || isInitialLoading) && (
              <>
                <span className="sr-only">Loading</span>

                <AlbumSkeleton />
                <AlbumSkeleton />
                <AlbumSkeleton />
                <AlbumSkeleton />
              </>
            )}
          </ul>
        ) : (
          <div className="w-full h-full grid place-items-center">
            <EmptyState />
          </div>
        )}
      </main>
    </div>
  )
}

export { AlbumShelf }
