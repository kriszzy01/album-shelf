import { useState } from 'react'
import clsx from 'clsx'

import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible } from '@/components/ui/collapsible'

import { SortBy } from '../types'

type Props = {
  selectedSortBy: SortBy | undefined
  onApplySortBy: (sortBy: SortBy) => void
}

export const Sort = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleCheck = (sortBy: SortBy) => {
    props.onApplySortBy(sortBy)
    setIsOpen(false)
  }

  return (
    <Collapsible
      isOpen={isOpen}
      onToggle={setIsOpen}
      title="Sort"
      className={clsx(isOpen ? 'mb-[68px]' : 'mb-4')}
    >
      <form className={'flex flex-col rounded-xs overflow-hidden'}>
        <Checkbox
          checked={props.selectedSortBy === 'name'}
          onCheck={() => handleCheck('name')}
          label="Album Name"
          id="name"
        />

        <Checkbox
          checked={props.selectedSortBy === 'releaseDate'}
          onCheck={() => handleCheck('releaseDate')}
          label="Release Date"
          id="date"
        />

        <Checkbox
          checked={props.selectedSortBy === 'totalTracks'}
          onCheck={() => handleCheck('totalTracks')}
          label="Total Tracks"
          id="tracks"
        />
      </form>
    </Collapsible>
  )
}
