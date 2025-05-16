import { NextResponse } from "next/server"

export async function GET() {
  // Эта функция может использоваться для проверки скорости загрузки API
  // и мониторинга производительности сайта

  const startTime = performance.now()

  // Имитация некоторой работы
  await new Promise((resolve) => setTimeout(resolve, 100))

  const endTime = performance.now()
  const responseTime = endTime - startTime

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    responseTime: `${responseTime.toFixed(2)}ms`,
    server: {
      node: process.version,
      environment: process.env.NODE_ENV,
    },
  })
}
