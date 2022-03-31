import { Component } from 'react'
import { Logtail } from '@logtail/browser'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }

    if (process.env.production === 'production') {
      this.logtail = new Logtail(process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN)
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, context) {
    this.logtail?.error(error?.message ?? 'An error occurred', {
      context,
      error,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-600">
            Đã xảy ra lỗi 😨 Bạn vui lòng tải lại trang hoặc truy cập vào trang
            chủ để thử lại.
          </h1>
          <h2 className="text-2xl text-gray-400">
            An error has occurred! Please refresh the page or visit the home
            page to try again.
          </h2>
        </div>
      )
    }

    return this.props.children
  }
}
