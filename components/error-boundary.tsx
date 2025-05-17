"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-2 text-2xl font-bold text-[#741717]">Что-то пошло не так</h2>
          <p className="mb-4 text-gray-600">
            Произошла ошибка при загрузке этого компонента. Пожалуйста, попробуйте обновить страницу.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="rounded-md bg-[#741717] px-4 py-2 text-white hover:bg-[#603a30]"
          >
            Попробовать снова
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
