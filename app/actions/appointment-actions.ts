"use server"

import { z } from "zod"
// Импортируем функции для отправки уведомлений в Telegram
import { sendTelegramNotification } from "@/lib/telegram-notification"

// Define the appointment schema for validation
const appointmentSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  email: z.string().email({ message: "Введите корректный email адрес" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Выберите корректную дату",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-2]):[0-5][0-9]$/, {
    message: "Выберите корректное время",
  }),
  service: z.string().min(1, { message: "Выберите услугу" }),
  message: z.string().optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

// Функция для форматирования данных заявки в читаемое сообщение
function formatAppointmentMessage(data: AppointmentFormData): string {
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

// Функция для получения названия услуги по коду
function getServiceName(serviceCode: string): string {
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

// Упрощаем функцию bookAppointment, удаляя лишние логи
export async function bookAppointment(formData: FormData) {
  // Simulate a delay to mimic server processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Extract and validate form data
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    service: formData.get("service") as string,
    message: formData.get("message") as string,
  }

  // Validate the data
  const validationResult = appointmentSchema.safeParse(rawData)

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  // В реальном приложении, здесь вы бы сохраняли данные в базу данных
  console.log("Appointment booked:", validationResult.data)

  // Отправляем уведомление в Telegram
  try {
    const message = formatAppointmentMessage(validationResult.data)
    await sendTelegramNotification(message)
  } catch (error) {
    console.error("Ошибка при отправке уведомления в Telegram:", error)
    // Не прерываем выполнение, даже если отправка уведомления не удалась
  }

  // Return success response with appointment details
  return {
    success: true,
    data: validationResult.data,
    message: "Запись на консультацию успешно создана",
  }
}
