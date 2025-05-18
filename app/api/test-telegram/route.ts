import { NextResponse } from "next/server"
import { sendTelegramNotification } from "@/lib/telegram-notification"

export async function GET() {
  try {
    // Отправляем тестовое сообщение в Telegram
    const testMessage = `
🧪 *Тестовое сообщение*

Это тестовое сообщение для проверки соединения с Telegram.
Время отправки: ${new Date().toLocaleString()}
    `

    const sent = await sendTelegramNotification(testMessage)

    if (sent) {
      return NextResponse.json({
        success: true,
        message: "Соединение с Telegram работает корректно",
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Не удалось отправить тестовое сообщение в Telegram",
      })
    }
  } catch (error) {
    console.error("Error testing Telegram connection:", error)
    return NextResponse.json({
      success: false,
      message: "Ошибка при проверке соединения с Telegram",
    })
  }
}
