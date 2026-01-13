import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
					<div className="text-center p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg max-w-md">
						<div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20 inline-block mb-4">
							<span className="material-symbols-outlined text-red-600 text-3xl">
								error
							</span>
						</div>
						<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
							Something went wrong
						</h2>
						<p className="text-gray-500 dark:text-gray-400 mb-4">
							An unexpected error occurred. Please try refreshing the page.
						</p>
						<button
							onClick={() => window.location.reload()}
							className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-blue-700 transition-colors"
						>
							Refresh Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
