import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DarkModeToggle from './DarkModeToggle'

describe('DarkModeToggle', () => {
	it('renders the toggle button', () => {
		const onToggle = vi.fn()
		render(<DarkModeToggle isDark={false} onToggle={onToggle} />)

		const button = screen.getByRole('button', { name: /toggle dark mode/i })
		expect(button).toBeInTheDocument()
	})

	it('calls onToggle when clicked', () => {
		const onToggle = vi.fn()
		render(<DarkModeToggle isDark={false} onToggle={onToggle} />)

		const button = screen.getByRole('button', { name: /toggle dark mode/i })
		fireEvent.click(button)

		expect(onToggle).toHaveBeenCalledTimes(1)
	})

	it('shows sun icon when in dark mode', () => {
		const onToggle = vi.fn()
		const { container } = render(<DarkModeToggle isDark={true} onToggle={onToggle} />)

		const svg = container.querySelector('svg')
		expect(svg).toHaveClass('text-yellow-400')
	})

	it('shows moon icon when in light mode', () => {
		const onToggle = vi.fn()
		const { container } = render(<DarkModeToggle isDark={false} onToggle={onToggle} />)

		const svg = container.querySelector('svg')
		expect(svg).toHaveClass('text-gray-700')
	})
})
