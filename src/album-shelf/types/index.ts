export type SortBy = 'totalTracks' | 'name' | 'releaseDate'

export type Filters = { albumName: string }

export type Artist = {
  id: string
  name: string
  albums: number
}

export type Album = {
  id: string
  artists: Artist[]
  cover: string
  name: string
  releaseDate: string
  totalTracks: number
}
