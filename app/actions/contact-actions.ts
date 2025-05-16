"use server"

import { sendTelegramNotification } from "@/lib/telegram-notification"
import { z } from "zod"

// Схема валидации для контактной формы
const contactSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  email: z.string().email({ message: "Введите корректный email адрес" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  message: z.string().min(10, { message: "Сообщение должно содержать не менее 10 символов" }),
  subject: z.string().optional(),
})

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      subject: formData.get("subject") as string | undefined,
    }

    // Валидация данных
    const validationResult = contactSchema.safeParse(rawData)

    if (!validationResult.success) {
      return {
        success: false,
        message: "Пожалуйста, заполните все поля формы корректно",
      }
    }

    const data = validationResult.data

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

    // Отправка уведомления в Telegram
    const sent = await sendTelegramNotification(telegramMessage)

    if (!sent) {
      console.error("Failed to send Telegram notification")
      return {
        success: false,
        message: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.",
      }
    }

    return {
      success: true,
      message: "Сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
    }
  }
}
