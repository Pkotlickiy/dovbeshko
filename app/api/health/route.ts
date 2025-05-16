import { NextResponse } from "next/server"

export async function GET() {
  // Простой эндпоинт для проверки работоспособности сервера
  // Может использоваться мониторинговыми системами

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
}
