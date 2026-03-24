import { useState } from 'react'
import debounce from 'lodash.debounce'

import { Collapsible } from '@/components/ui/collapsible'

import searchIcon from './search.svg'
import clearIcon from './clear.svg'

import { Filters } from '../../types'

type Props = {
  onApplyFilter: (filter: Partial<Filters>) => void
}

export const ShelfFilters = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [albumName, setAlbumName] = useState<string | null>(null)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumName(event.target.value)
    debounce(() => {
      props.onApplyFilter({ albumName: event.target.value.trim() })
    }, 1000)()
  }

  const handleClear = () => {
    setAlbumName(null)
    props.onApplyFilter({ albumName: '' })
  }

  return (
    <Collapsible
      isOpen={isOpen}
      onToggle={setIsOpen}
      title="Filters"
      className="mb-2"
    >
      <form className={'flex flex-col pt-[14px]'}>
        <div className="space-y-2">
          <div className="flex space-x-[6px] items-center">
            <p className="text-primary-semi font-sans-bold text-sm">SEARCH</p>
            <div className="h-[1.32px] grow bg-primary-semi" />
          </div>

          <div className="flex space-x-2 h-[44px] items-center">
            <div className="px-3 grow flex items-center space-x-2 h-full border border-2 border-primary-bright rounded-xs">
              <img
                role="presentation"
                src={searchIcon}
                alt=""
                className="w-5 h-5"
              />
              <input
                type="text"
                value={albumName || ''}
                placeholder="Enter album name"
                onChange={handleSearch}
                className=" bg-transparent outline-none caret-primary-bright text-primary-medium font-medium"
              />
            </div>

            <button
              type="button"
              onClick={handleClear}
              aria-label="clear input"
              className="w-[52px] h-full bg-primary-medium rounded-xs grid place-items-center"
            >
              <img role="presentation" src={clearIcon} alt="" />
            </button>
          </div>
        </div>
      </form>
    </Collapsible>
  )
}
