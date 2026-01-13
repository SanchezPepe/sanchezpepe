import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useDarkMode } from './useDarkMode'

const localStorageMock = (() => {
	let store: Record<string, string> = {}
	return {
		getItem: (key: string) => store[key] ?? null,
		setItem: (key: string, value: string) => { store[key] = value },
		removeItem: (key: string) => { delete store[key] },
		clear: () => { store = {} },
	}
})()

const mockMatchMedia = (matches: boolean) => ({
	matches,
	media: '',
	onchange: null,
	addListener: vi.fn(),
	removeListener: vi.fn(),
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn(),
})

describe('useDarkMode', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true })
		localStorageMock.clear()
		document.documentElement.classList.remove('dark')
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation(() => mockMatchMedia(false)),
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should initialize with system preference when no saved preference', () => {
		const { result } = renderHook(() => useDarkMode())
		expect(result.current.isDark).toBe(false)
	})

	it('should toggle dark mode', () => {
		const { result } = renderHook(() => useDarkMode())

		expect(result.current.isDark).toBe(false)

		act(() => {
			result.current.toggleDarkMode()
		})

		expect(result.current.isDark).toBe(true)
		expect(document.documentElement.classList.contains('dark')).toBe(true)
	})

	it('should persist preference to localStorage', () => {
		const { result } = renderHook(() => useDarkMode())

		act(() => {
			result.current.toggleDarkMode()
		})

		expect(localStorage.getItem('darkMode')).toBe('true')
	})

	it('should load saved preference from localStorage', () => {
		localStorage.setItem('darkMode', 'true')

		const { result } = renderHook(() => useDarkMode())
		expect(result.current.isDark).toBe(true)
	})
})
