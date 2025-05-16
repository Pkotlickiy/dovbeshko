/**
 * Модуль для отправки уведомлений в Telegram
 */

/**
 * Отправляет уведомление в Telegram
 * @param message Текст сообщения
 * @returns Promise с результатом отправки
 */
export async function sendTelegramNotification(message: string) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error("Telegram bot token or chat ID not configured")
      return false
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    const data = await response.json()
    return data.ok
  } catch (error) {
    console.error("Error sending Telegram notification:", error)
    return false
  }
}

/**
 * Форматирует данные заявки в читаемое сообщение для Telegram
 * @param data Данные заявки
 * @returns Отформатированное сообщение
 */
export function formatAppointmentMessage(data: any): string {
  const serviceName = getServiceName(data.service)

  return `
📅 *Новая заявка на консультацию*

👤 *Клиент:* ${data.name}
📧 *Email:* ${data.email}
📞 *Телефон:* ${data.phone}
📆 *Дата:* ${new Date(data.date).toLocaleDateString("ru-RU")}
🕒 *Время:* ${data.time}
🔍 *Услуга:* ${serviceName}
${data.message ? `💬 *Сообщение:* ${data.message}` : ""}
  `
}

/**
 * Получает название услуги по коду
 * @param serviceCode Код услуги
 * @returns Название услуги
 */
export function getServiceName(serviceCode: string): string {
  const serviceMap: Record<string, string> = {
    criminal: "Уголовное право",
    military: "Военное право",
    land: "Земельное право",
    consumer: "Защита прав потребителей",
    realestate: "Сделки с недвижимостью",
    arbitration: "Арбитражное право",
    inheritance: "Наследство",
    unjust_enrichment: "Неосновательное обогащение",
    medical: "Медицинское право",
    consultation: "Общая консультация",
  }

  return serviceMap[serviceCode] || serviceCode
}

/**
 * Отправляет уведомление о новой заявке в Telegram
 * @param data Данные заявки
 * @returns Promise с результатом отправки
 */
export async function sendAppointmentNotification(data: any): Promise<boolean> {
  const message = formatAppointmentMessage(data)
  return await sendTelegramNotification(message)
}
