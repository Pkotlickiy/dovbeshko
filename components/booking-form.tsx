"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, Clock, FileText, Mail, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookAppointment } from "@/app/actions/appointment-actions"
import { motion } from "framer-motion"
import { AnimatedItem } from "@/components/animated-section"
import { toast } from "@/components/ui/use-toast"

// Добавим улучшенную валидацию и обратную связь
const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  email: z.string().email({ message: "Введите корректный email адрес" }),
  phone: z
    .string()
    .min(6, { message: "Введите корректный номер телефона" })
    .regex(/^[+]?[0-9]{1}[ ]?[(]?[0-9]{3}[)]?[ ]?[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{2}$/, {
      message: "Введите корректный российский номер телефона",
    }),
  date: z.date({
    required_error: "Выберите дату консультации",
  }),
  time: z.string({
    required_error: "Выберите время консультации",
  }),
  service: z.string({
    required_error: "Выберите услугу",
  }),
  message: z.string().optional(),
})

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

const services = [
  { value: "criminal", label: "Уголовное право" },
  { value: "military", label: "Военное право" },
  { value: "land", label: "Земельное право" },
  { value: "consumer", label: "Защита прав потребителей" },
  { value: "realestate", label: "Сделки с недвижимостью" },
  { value: "arbitration", label: "Арбитражное право" },
  { value: "inheritance", label: "Наследство" },
  { value: "unjust_enrichment", label: "Неосновательное обогащение" },
  { value: "medical", label: "Медицинское право" },
  { value: "consultation", label: "Общая консультация" },
]

export function BookingForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  // Добавим улучшенную обратную связь при отправке формы
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("email", values.email)
      formData.append("phone", values.phone)
      formData.append("date", values.date.toISOString())
      formData.append("time", values.time)
      formData.append("service", values.service)
      if (values.message) formData.append("message", values.message)

      const result = await bookAppointment(formData)

      if (result.success) {
        // Показываем уведомление об успешной отправке
        toast({
          title: "Запись создана",
          description: "Ваша заявка на консультацию успешно отправлена",
        })

        // Redirect to confirmation page
        router.push("/booking/confirmation")
      } else {
        // Handle validation errors
        toast({
          title: "Ошибка отправки",
          description: "Пожалуйста, проверьте введенные данные и попробуйте снова",
          variant: "destructive",
        })

        // Исправляем обработку ошибок сервера
        if (result.errors) {
          // Используем Object.entries для безопасного перебора ошибок
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
              form.setError(field as any, {
                type: "server",
                message: messages[0],
              })
            }
          })
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Ошибка сервера",
        description: "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-[#c4bab3]/20 bg-white p-6 shadow-lg">
      {/* Декоративные элементы */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f8f5f2] blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#f8f5f2] blur-xl"></div>

      <div className="relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="Форма записи на консультацию">
            <div className="grid gap-6 sm:grid-cols-2">
              <AnimatedItem delay={0.1}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#603a30] flex items-center gap-2">
                        <User className="h-4 w-4 text-[#741717]" aria-hidden="true" />
                        <span>
                          Имя{" "}
                          <span aria-hidden="true" className="text-red-500">
                            *
                          </span>
                          <span className="sr-only">(обязательное поле)</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Иван Иванов"
                            {...field}
                            className="border-[#c4bab3] transition-all duration-300 focus:border-[#741717] focus:ring-[#741717]"
                            autoComplete="name"
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#741717]/50"
                            animate={field.value ? { width: "100%" } : { width: "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedItem>

              <AnimatedItem delay={0.2}>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#603a30] flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#741717]" />
                        <span>
                          Телефон <span className="text-red-500">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+7 (XXX) XXX-XX-XX"
                          {...field}
                          className="border-[#c4bab3] transition-all duration-300 focus:border-[#741717] focus:ring-[#741717]"
                          autoComplete="tel"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedItem>
            </div>

            <AnimatedItem delay={0.3}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#603a30] flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#741717]" />
                      <span>
                        Email <span className="text-red-500">*</span>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@mail.ru"
                        {...field}
                        className="border-[#c4bab3] transition-all duration-300 focus:border-[#741717] focus:ring-[#741717]"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedItem>

            <div className="grid gap-6 sm:grid-cols-2">
              <AnimatedItem delay={0.4}>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[#603a30] flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-[#741717]" />
                        <span>
                          Дата <span className="text-red-500">*</span>
                        </span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "border-[#c4bab3] pl-3 text-left font-normal transition-all duration-300 hover:border-[#741717]",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP", { locale: ru }) : <span>Выберите дату</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              // Disable past dates and weekends
                              const today = new Date()
                              today.setHours(0, 0, 0, 0)
                              const day = date.getDay()
                              return date < today || day === 0 || day === 6
                            }}
                            initialFocus
                            aria-label="Выберите дату консультации"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedItem>

              <AnimatedItem delay={0.5}>
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#603a30] flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#741717]" />
                        <span>
                          Время <span className="text-red-500">*</span>
                        </span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-[#c4bab3] transition-all duration-300 hover:border-[#741717]">
                            <SelectValue placeholder="Выберите время" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedItem>
            </div>

            <AnimatedItem delay={0.6}>
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#603a30] flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#741717]" />
                      <span>
                        Услуга <span className="text-red-500">*</span>
                      </span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[#c4bab3] transition-all duration-300 hover:border-[#741717]">
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedItem>

            <AnimatedItem delay={0.7}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#603a30] flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#741717]" />
                      <span>Сообщение (необязательно)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Опишите кратко вашу ситуацию или вопрос"
                        className="min-h-[120px] border-[#c4bab3] transition-all duration-300 focus:border-[#741717] focus:ring-[#741717]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedItem>

            <AnimatedItem delay={0.8}>
              <motion.div
                className="relative overflow-hidden rounded-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="relative w-full bg-[#741717] text-white transition-all duration-300 hover:bg-[#603a30]"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  <span className="relative z-10">{isSubmitting ? "Отправка..." : "Записаться на консультацию"}</span>
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#8B0000] to-[#741717] opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                </Button>
              </motion.div>
            </AnimatedItem>

            <AnimatedItem delay={0.9}>
              <p className="text-xs text-[#603a30]">
                * Отправляя форму, вы соглашаетесь с{" "}
                <a href="/privacy" className="text-[#741717] hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </AnimatedItem>
          </form>
        </Form>
      </div>
    </div>
  )
}
