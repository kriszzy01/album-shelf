import { faker } from '@faker-js/faker'

const generateMockAlbum = (albumName?: string) => ({
  id: faker.string.uuid(),
  artists: [
    {
      id: faker.string.uuid(),
      name: faker.person.fullName,
      albums: faker.number.int(),
    },
  ],
  cover: faker.image.url,
  name: albumName || faker.person.firstName(),
  releaseDate: faker.date.anytime().toString(),
  totalTracks: faker.number.int(),
})

export const generateMockAlbums = (amount: number) => {
  let mockAlbums

  for (let i = 0; i < amount; i++) {
    if (i) {
      mockAlbums.push(generateMockAlbum())
    } else {
      mockAlbums = [generateMockAlbum()]
    }
  }

  return mockAlbums
}

export const USER_DEFINED_ALBUM_NAME = 'Interloom Challenge by Chris'

export const userDefinedMock = generateMockAlbum(USER_DEFINED_ALBUM_NAME)
export const firstPageMock = [...generateMockAlbums(9), userDefinedMock]
export const secondPageMock = generateMockAlbums(5)
export const searchMock = [userDefinedMock]
export const pagesMock = { '1': firstPageMock, '2': secondPageMock }

export const getSortedData = (page: string) => {
  return [...pagesMock[page]].sort((a, b) => a.name.localeCompare(b.name))
}
