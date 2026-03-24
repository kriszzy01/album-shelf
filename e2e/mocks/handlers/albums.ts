import { http, HttpResponse } from 'msw'
import { getSortedData, pagesMock, searchMock } from '../data/albums'

const API_BASE_URL = 'https://fe-coding-challenge-server.vercel.app'

export const albumsHandlers = [
  http.get(`${API_BASE_URL}/albums`, ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('_page') || '1'
    const sort = url.searchParams.get('_sort')
    const query = url.searchParams.get('q')

    const responseData = sort
      ? getSortedData(page)
      : query
        ? searchMock
        : pagesMock[page]

    console.log(request.url)

    return HttpResponse.json(responseData, {
      status: 200,
    })
  }),
]
