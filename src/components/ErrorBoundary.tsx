import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const state = (this as any).state;
    const props = (this as any).props;

    if (state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      try {
        const parsed = JSON.parse(state.error?.message || "");
        if (parsed.error && parsed.operationType) {
          errorMessage = `Firestore Error: ${parsed.error} during ${parsed.operationType} on ${parsed.path}`;
        }
      } catch (e) {
        errorMessage = state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Something went wrong</h2>
          <p className="text-black/60 mb-8 max-w-md">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-black text-white font-medium tracking-widest uppercase hover:bg-black/80 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return props.children;
  }
}

export default ErrorBoundary;
