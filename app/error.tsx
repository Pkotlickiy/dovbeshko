"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled error:", error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-[#741717]">500</h1>
      <h2 className="mb-6 text-2xl font-semibold">Что-то пошло не так</h2>
      <p className="mb-8 max-w-md text-gray-600">
        Извините, на сервере произошла ошибка. Наша команда уже работает над её устранением. Пожалуйста, попробуйте
        обновить страницу или вернитесь позже.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          onClick={reset}
          className="rounded-md bg-[#741717] px-6 py-3 text-white transition-colors hover:bg-[#603a30]"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="rounded-md border border-[#741717] px-6 py-3 text-[#741717] transition-colors hover:bg-[#741717] hover:text-white"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
