"use client"

import { Inter, Playfair_Display } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" })
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
})

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-6xl font-bold text-[#741717]">Ошибка</h1>
          <h2 className="mb-6 text-2xl font-semibold">Критическая ошибка приложения</h2>
          <p className="mb-8 max-w-md text-gray-600">
            Извините, произошла критическая ошибка. Наша команда уже работает над её устранением. Пожалуйста, попробуйте
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
      </body>
    </html>
  )
}
