import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ErrorBoundary from './ErrorBoundary'

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
	if (shouldThrow) {
		throw new Error('Test error')
	}
	return <div>Child component</div>
}

describe('ErrorBoundary', () => {
	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('renders children when there is no error', () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={false} />
			</ErrorBoundary>
		)

		expect(screen.getByText('Child component')).toBeInTheDocument()
	})

	it('renders error UI when child throws', () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		)

		expect(screen.getByText('Something went wrong')).toBeInTheDocument()
		expect(screen.getByText(/An unexpected error occurred/)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument()
	})

	it('renders custom fallback when provided', () => {
		render(
			<ErrorBoundary fallback={<div>Custom fallback</div>}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		)

		expect(screen.getByText('Custom fallback')).toBeInTheDocument()
	})
})
