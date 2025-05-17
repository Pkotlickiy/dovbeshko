import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Страница не найдена | Адвокат Довбешко С.Ю.",
  description: "Запрашиваемая страница не найдена. Вернитесь на главную страницу сайта адвоката Довбешко С.Ю.",
}

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-[#741717]">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Страница не найдена</h2>
      <p className="mb-8 max-w-md text-gray-600">
        Извините, запрашиваемая страница не существует или была перемещена. Пожалуйста, вернитесь на главную страницу.
      </p>
      <Link href="/" className="rounded-md bg-[#741717] px-6 py-3 text-white transition-colors hover:bg-[#603a30]">
        Вернуться на главную
      </Link>
    </div>
  )
}
