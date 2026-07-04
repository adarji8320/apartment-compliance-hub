import { Component } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '@/types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center p-8">
            <div className="max-w-md text-center">
              <h2 className="mb-2 text-xl font-semibold text-red-700">Something went wrong</h2>
              <p className="mb-4 text-gray-600">{this.state.error?.message}</p>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="rounded-md bg-brand px-4 py-2 text-white hover:bg-brand/90"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
