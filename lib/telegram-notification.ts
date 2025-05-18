/**
 * Утилита для отправки уведомлений в Telegram
 */

// Функция для отправки уведомления в Telegram
export async function sendTelegramNotification(message: string): Promise<boolean> {
  try {
    // Получаем токен и chat_id из переменных окружения
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    // Проверяем наличие необходимых переменных окружения
    if (!token || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables")
      return false
    }

    // Формируем URL для API Telegram
    const url = `https://api.telegram.org/bot${token}/sendMessage`

    // Отправляем запрос к API Telegram
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    // Проверяем успешность запроса
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Telegram API error:", errorData)
      return false
    }

    // Получаем и возвращаем результат
    const result = await response.json()
    console.log("Telegram notification sent successfully:", result)
    return true
  } catch (error) {
    console.error("Error sending Telegram notification:", error)
    return false
  }
}

// Функция для отправки уведомления о новой записи на консультацию
export async function sendAppointmentNotification(data: {
  name: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  message?: string
}): Promise<boolean> {
  // Форматирование сообщения для Telegram
  const telegramMessage = `
📅 *Новая запись на консультацию!*

👤 *Имя:* ${data.name}
📧 *Email:* ${data.email}
📱 *Телефон:* ${data.phone}
🗓️ *Дата:* ${data.date}
⏰ *Время:* ${data.time}
💼 *Услуга:* ${data.service}
${data.message ? `💬 *Сообщение:* ${data.message}\n` : ""}
  `

  return sendTelegramNotification(telegramMessage)
}

// Функция для отправки уведомления о контактной форме
export async function sendContactNotification(data: {
  name: string
  email: string
  phone: string
  message: string
  subject?: string
}): Promise<boolean> {
  // Форматирование сообщения для Telegram
  const telegramMessage = `
📬 *Новое сообщение с сайта!*

👤 *Имя:* ${data.name}
📧 *Email:* ${data.email}
📱 *Телефон:* ${data.phone}
${data.subject ? `📋 *Тема:* ${data.subject}\n` : ""}
💬 *Сообщение:* 
${data.message}
  `

  return sendTelegramNotification(telegramMessage)
}

// Функция для тестирования соединения с Telegram
export async function testTelegramConnection(): Promise<{
  success: boolean
  message: string
}> {
  try {
    const sent = await sendTelegramNotification("🧪 *Тестовое сообщение* 🧪\nПроверка соединения с Telegram API")

    if (sent) {
      return {
        success: true,
        message: "Тестовое сообщение успешно отправлено в Telegram",
      }
    } else {
      return {
        success: false,
        message: "Не удалось отправить тестовое сообщение в Telegram",
      }
    }
  } catch (error) {
    console.error("Test Telegram connection error:", error)
    return {
      success: false,
      message: `Ошибка при тестировании соединения с Telegram: ${error}`,
    }
  }
}
