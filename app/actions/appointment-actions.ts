"use server"

import { z } from "zod"
// Импортируем функции для отправки уведомлений в Telegram
import { sendAppointmentNotification } from "@/lib/telegram-notification"

// Define the appointment schema for validation
const appointmentSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  email: z.string().email({ message: "Введите корректный email адрес" }),
  phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Выберите корректную дату",
  }),
  time: z.string().min(1, { message: "Выберите время консультации" }).optional().or(z.literal("")),
  service: z.string().min(1, { message: "Выберите услугу" }),
  message: z.string().optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

export type AppointmentResult = {
  success: boolean
  errors?: Record<string, string[]>
  data?: AppointmentFormData
  message?: string
}

export async function bookAppointment(formData: FormData): Promise<AppointmentResult> {
  // Simulate a delay to mimic server processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Extract and validate form data
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    date: formData.get("date") as string,
    time: (formData.get("time") as string) || "",
    service: formData.get("service") as string,
    message: (formData.get("message") as string) || "",
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
    const sent = await sendAppointmentNotification(validationResult.data)

    if (!sent) {
      console.error("Failed to send Telegram notification for appointment")
      // Не прерываем выполнение, даже если отправка уведомления не удалась
    }
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
