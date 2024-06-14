import { render } from '@testing-library/react'
import LoadingSpinner from '.'
 
it('renders homepage unchanged', () => {
  const { container } = render(<LoadingSpinner />)
  expect(container).toMatchSnapshot()
})