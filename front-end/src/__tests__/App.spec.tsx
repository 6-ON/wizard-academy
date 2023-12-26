import App from '@/App'
import { render, screen } from '@testing-library/react'
describe('App', () => {
	it('should render App', () => {
		render(<App />)
		screen.debug()
		expect(screen.getByText('App')).toBeInTheDocument()
	})
})
