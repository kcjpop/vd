import { rdr } from '@/lib/test-utils'
import { PageNavigation } from '../PageNavigation'

describe('/flashcards/PageNavigation', () => {
  it('should render PageNavigation', () => {
    const { getByText } = rdr(
      <PageNavigation page={1} total={20} perPage={9} />,
    )

    expect(getByText(/Next/i)).toBeDefined()
    expect(getByText(/Previous/i)).toBeDefined()
  })

  it('should NOT render PageNavigation if total sets smaller than perPage', () => {
    const { container } = rdr(<PageNavigation page={1} total={2} perPage={9} />)

    expect(container.querySelectorAll('svg')).toHaveLength(0)
  })

  it('should NOT be able to click Prev if page equals to 1', () => {
    const { getByText } = rdr(
      <PageNavigation page={1} total={20} perPage={9} />,
    )

    expect(getByText(/Previous/i).closest('button')).toHaveAttribute('disabled')
  })

  it('should be able to click Prev if page is greater than 1', () => {
    const { getByText } = rdr(
      <PageNavigation page={2} total={15} perPage={9} />,
    )

    expect(getByText(/Previous/i).closest('button')).not.toHaveAttribute(
      'disabled',
    )
  })

  it('should NOT be able to click Nex on last page available', () => {
    const { getByText } = rdr(
      <PageNavigation page={2} total={15} perPage={9} />,
    )

    expect(getByText(/Next/i).closest('button')).toHaveAttribute('disabled')
  })

  it('should be able to click Next if page is not the last page', () => {
    const { getByText } = rdr(
      <PageNavigation page={1} total={15} perPage={9} />,
    )

    expect(getByText(/Next/i).closest('button')).not.toHaveAttribute('disabled')
  })
})
