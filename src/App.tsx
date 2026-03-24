import '../main.css'

import { FC } from 'react'

import { AlbumShelf } from '@/album-shelf'
import { AppProvider } from '@/providers/app'

export const App: FC = () => {
  return (
    <AppProvider>
      <AlbumShelf />
    </AppProvider>
  )
}
