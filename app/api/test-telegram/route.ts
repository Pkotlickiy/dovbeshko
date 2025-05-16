import { NextResponse } from "next/server"
import { sendTelegramNotification } from "@/lib/telegram-notification"

export async function GET() {
  try {
    const testMessage = `
🧪 *Тестовое сообщение*

Это тестовое сообщение для проверки работы уведомлений Telegram.
Время отправки: ${new Date().toLocaleString("ru-RU")}
    `

    const result = await sendTelegramNotification(testMessage)

    if (result) {
      return NextResponse.json({ success: true, message: "Тестовое сообщение успешно отправлено в Telegram" })
    } else {
      return NextResponse.json(
        { success: false, message: "Не удалось отправить тестовое сообщение в Telegram" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error testing Telegram notification:", error)
    return NextResponse.json(
      { success: false, message: "Произошла ошибка при тестировании уведомлений Telegram" },
      { status: 500 },
    )
  }
}
