import { Component } from 'react'
import { Logtail } from '@logtail/browser'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
    this.logtail = new Logtail(process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN)
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.logtail.error(error)
    this.logtail.error(errorInfo, error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.stack}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
