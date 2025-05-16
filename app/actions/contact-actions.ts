"use server"

import { sendTelegramNotification } from "@/lib/telegram-notification"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    // Validate form data
    if (!name || !email || !phone || !message) {
      return {
        success: false,
        message: "Пожалуйста, заполните все поля формы",
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Пожалуйста, введите корректный email адрес",
      }
    }

    // Basic phone validation
    const phoneRegex = /^[+]?[0-9]{1}[ ]?[(]?[0-9]{3}[)]?[ ]?[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{2}$/
    if (!phoneRegex.test(phone)) {
      return {
        success: false,
        message: "Пожалуйста, введите корректный номер телефона",
      }
    }

    // Format message for Telegram
    const telegramMessage = `
📬 Новое сообщение с сайта!

👤 Имя: ${name}
📧 Email: ${email}
📱 Телефон: ${phone}
💬 Сообщение: ${message}
    `

    // Send notification to Telegram
    await sendTelegramNotification(telegramMessage)

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
