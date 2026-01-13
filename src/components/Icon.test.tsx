import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Icon from './Icon'

describe('Icon', () => {
	it('renders GitHub icon from iconMap', () => {
		const { container } = render(<Icon name="github" />)

		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()
		expect(svg).toHaveAttribute('aria-hidden', 'true')
	})

	it('renders LinkedIn icon from iconMap', () => {
		const { container } = render(<Icon name="linkedin" />)

		const svg = container.querySelector('svg')
		expect(svg).toBeInTheDocument()
	})

	it('falls back to material symbols for unknown icons', () => {
		render(<Icon name="unknown_icon" />)

		const span = screen.getByText('unknown_icon')
		expect(span).toBeInTheDocument()
		expect(span).toHaveClass('material-symbols-outlined')
	})

	it('applies custom className', () => {
		const { container } = render(<Icon name="github" className="h-8 w-8" />)

		const svg = container.querySelector('svg')
		expect(svg).toHaveClass('h-8', 'w-8')
	})

	it('uses default className when not provided', () => {
		const { container } = render(<Icon name="github" />)

		const svg = container.querySelector('svg')
		expect(svg).toHaveClass('h-5', 'w-5')
	})
})
