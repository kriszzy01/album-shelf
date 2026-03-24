import { test, expect } from './setup-tests'
import {
  USER_DEFINED_ALBUM_NAME,
  getSortedData,
  pagesMock,
  searchMock,
} from './mocks/data/albums'

test.describe('Album Shelf Smoke Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })

  const firstPage = pagesMock[1]
  const secondPage = pagesMock[2]
  const sortedFirstPage = getSortedData('1')

  test('should contain albums', async ({ page }) => {
    const albums = page.getByRole('listitem')

    await expect(albums).toHaveCount(firstPage.length)
  })

  test('should load more albums once page is scroll to last album', async ({
    page,
  }) => {
    const albums = page.getByRole('listitem')

    await expect(albums).toHaveCount(firstPage.length)

    await page.getByTestId('lastElement').scrollIntoViewIfNeeded()

    await expect(albums).toHaveCount(firstPage.length + secondPage.length)
  })

  test('should sort results when sort item is clicked', async ({ page }) => {
    {
      /* Test Cases for Total Tracks and Release Date will work same way */
    }

    await page.getByRole('button', { name: 'Sort' }).click()

    const sortItems = page.getByRole('checkbox')
    await expect(sortItems).toHaveCount(3)

    await expect(page.getByRole('listitem')).toContainText(
      firstPage.map((item) => item.name)
    )
    const alBumNameSortCheckbox = page.getByRole('checkbox', {
      name: 'Album Name',
    })

    await alBumNameSortCheckbox.click()
    await expect(alBumNameSortCheckbox).not.toBeVisible()

    const allNames = page.getByTestId('albumName')

    await expect(allNames).toContainText(
      sortedFirstPage.map((item) => item.name)
    )
  })

  test('should search by name', async ({ page }) => {
    test.setTimeout(20000)

    const input = page.getByPlaceholder('Enter album name')
    expect(input).not.toBeVisible()

    await page.getByRole('button', { name: 'Filters' }).click()
    expect(input).toBeVisible()

    const albums = page.getByRole('listitem')

    expect(albums).toHaveCount(firstPage.length)

    await input.fill(USER_DEFINED_ALBUM_NAME)

    await expect(albums).toHaveCount(searchMock.length)

    // Clearing Input
    page.getByRole('button', { name: 'clear input' }).click()

    await expect(albums).toHaveCount(firstPage.length)
  })
})
