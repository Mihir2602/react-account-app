import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Set up the initial state variables to track any crashes.
    this.state = {
      hasError: false,
      message: '',
    };
  }

  static getDerivedStateFromError(error) {
    // Updated the state so the next render shows a fallback UI
    return {
      hasError: true,
      message: error?.message || 'Something went wrong.',
    };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger" role="alert">
            {/* UI seeing error here... */}
          <h5 className="mb-1">Oops, something broke.</h5>
          <small>{this.state.message}</small>
        </div>
      );
    }

    // if there isNo error then just render children normally.
    return this.props.children;
  }
}

export default ErrorBoundary;
