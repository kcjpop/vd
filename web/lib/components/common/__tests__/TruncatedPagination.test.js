import { rdr } from '@/lib/test-utils'
import { TruncatedPagination } from '../TruncatedPagination'

describe('TruncatedPagination', () => {
  it('should truncate pages from the start', () => {
    const { container } = rdr(
      <TruncatedPagination currentPage={1} totalPage={1000} />,
    )

    const textsToMatch = ['1', '2', '3', '4', '5', '…', '1000']

    const spans = [...container.querySelectorAll('span')]
    spans.forEach((span, i) => {
      expect(span.textContent).toBe(textsToMatch[i])
    })
  })

  it('should truncate pages in middle', () => {
    const { container } = rdr(
      <TruncatedPagination currentPage={100} totalPage={1000} />,
    )

    const textsToMatch = [
      '1',
      '…',
      '98',
      '99',
      '100',
      '101',
      '102',
      '…',
      '1000',
    ]

    const spans = [...container.querySelectorAll('span')]
    spans.forEach((span, i) => {
      expect(span.textContent).toBe(textsToMatch[i])
    })
  })

  it('should truncate pages at the end', () => {
    const { container } = rdr(
      <TruncatedPagination currentPage={999} totalPage={1000} />,
    )

    const textsToMatch = ['1', '…', '996', '997', '998', '999', '1000']

    const spans = [...container.querySelectorAll('span')]
    spans.forEach((span, i) => {
      expect(span.textContent).toBe(textsToMatch[i])
    })
  })
})
