import { Fragment } from 'react'
import { Album as AlbumType } from '../../types'
import play from './play.svg'

export const Album = (props: AlbumType) => {
  return (
    <>
      <div className="h-[152px] w-[152px] lg:h-[215px] lg:w-[215px] relative">
        <img
          src={props.cover}
          alt={props.name}
          className="h-full w-full object-cover object-top rounded-sm overflow-hidden drop-shadow-sm"
        />
        <div className="absolute bottom-[6px] right-[6px] w-[35px] h-[35px] grid place-items-center rounded-full bg-black border border-2 border-white border-opacity-50">
          <img role="presentation" src={play} alt="" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p
          data-testid={'albumName'}
          className="text-sm text-grey-dark font-sans-bold leading-[19.12px]"
        >
          {props.name}
        </p>
        <div className="w-full px-[6px] flex items-center justify-center font-sans leading-[13.66px]">
          {props.artists.map((artist) => (
            <Fragment key={props.name + artist.id}>
              <p className="text-xs text-opacity-40 text-black">
                {artist.name}
              </p>

              <span className="w-[3.28px] h-[3.28px] rounded-full bg-black bg-opacity-40 mx-1" />
            </Fragment>
          ))}
          <p className="text-xs text-opacity-40 text-black">
            {new Date(props.releaseDate).getFullYear()}
          </p>
        </div>
      </div>
    </>
  )
}
