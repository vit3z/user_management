import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LoadingSpinner from '.'
 
describe("Loading Spinner", () => {
  it('renders the loading spinner in a snapshot', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container).toMatchSnapshot()
  })
  it('renders the spinner', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container).toBeInTheDocument();
  })
})