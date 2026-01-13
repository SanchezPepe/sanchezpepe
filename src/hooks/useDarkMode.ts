import { useState, useEffect, useCallback } from 'react';

interface UseDarkModeReturn {
	isDark: boolean;
	toggleDarkMode: () => void;
}

export const useDarkMode = (): UseDarkModeReturn => {
	const [isDark, setIsDark] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false;
		const saved = localStorage.getItem('darkMode');
		if (saved !== null) {
			return JSON.parse(saved) as boolean;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		if (isDark) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
		localStorage.setItem('darkMode', JSON.stringify(isDark));
	}, [isDark]);

	const toggleDarkMode = useCallback(() => setIsDark(prev => !prev), []);

	return { isDark, toggleDarkMode };
};
