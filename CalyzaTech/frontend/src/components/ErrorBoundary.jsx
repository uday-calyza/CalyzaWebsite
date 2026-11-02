import { Component } from 'react';

/* Guarantees the page never goes blank: a failing section degrades to a stable
   styled fallback (or nothing, for decorative sections) while the rest lives on. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error(`[Calyza] section "${this.props.name || 'unknown'}" failed:`, error, info);
  }

  render() {
    if (this.state.failed) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="bg-t-bg px-6 py-24 text-center" data-testid={`error-fallback-${this.props.name || 'section'}`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-t-fg-mut">
            This section couldn't load
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-t-acc underline-offset-4 hover:underline"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
