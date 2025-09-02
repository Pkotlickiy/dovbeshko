#!/usr/bin/env node

interface TelegramTestResult {
  success: boolean
  message: string
  details?: any
}

class TelegramTester {
  private botToken: string
  private chatId: string

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || ""
    this.chatId = process.env.TELEGRAM_CHAT_ID || ""
  }

  private async makeRequest(method: string, data?: any): Promise<any> {
    const url = `https://api.telegram.org/bot${this.botToken}/${method}`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${result.description || "Unknown error"}`)
      }

      return result
    } catch (error) {
      throw new Error(`Ошибка запроса к Telegram API: ${error}`)
    }
  }

  public async checkConfiguration(): Promise<TelegramTestResult> {
    console.log("🔧 Проверка конфигурации Telegram...")

    if (!this.botToken) {
      return {
        success: false,
        message: "Отсутствует TELEGRAM_BOT_TOKEN в переменных окружения",
      }
    }

    if (!this.chatId) {
      return {
        success: false,
        message: "Отсутствует TELEGRAM_CHAT_ID в переменных окружения",
      }
    }

    // Проверяем формат токена
    if (!this.botToken.match(/^\d+:[A-Za-z0-9_-]+$/)) {
      return {
        success: false,
        message: "Неверный формат TELEGRAM_BOT_TOKEN",
      }
    }

    // Проверяем формат chat_id
    if (!this.chatId.match(/^-?\d+$/)) {
      return {
        success: false,
        message: "Неверный формат TELEGRAM_CHAT_ID",
      }
    }

    return {
      success: true,
      message: "Конфигурация корректна",
    }
  }

  public async testConnection(): Promise<TelegramTestResult> {
    console.log("🌐 Тестирование соединения с Telegram API...")

    try {
      const result = await this.makeRequest("getMe")

      return {
        success: true,
        message: `Соединение успешно. Бот: ${result.result.first_name} (@${result.result.username})`,
        details: result.result,
      }
    } catch (error) {
      return {
        success: false,
        message: `Ошибка соединения: ${error}`,
      }
    }
  }

  public async testChatAccess(): Promise<TelegramTestResult> {
    console.log("💬 Проверка доступа к чату...")

    try {
      const result = await this.makeRequest("getChat", {
        chat_id: this.chatId,
      })

      return {
        success: true,
        message: `Доступ к чату подтвержден: ${result.result.title || result.result.first_name || "Приватный чат"}`,
        details: result.result,
      }
    } catch (error) {
      return {
        success: false,
        message: `Ошибка доступа к чату: ${error}`,
      }
    }
  }

  public async sendTestMessage(): Promise<TelegramTestResult> {
    console.log("📤 Отправка тестового сообщения...")

    const testMessage = `🧪 Тестовое сообщение от сайта адвоката
    
⏰ Время: ${new Date().toLocaleString("ru-RU")}
🔧 Тест: Проверка работоспособности Telegram уведомлений
✅ Статус: Система работает корректно`

    try {
      const result = await this.makeRequest("sendMessage", {
        chat_id: this.chatId,
        text: testMessage,
        parse_mode: "HTML",
      })

      return {
        success: true,
        message: "Тестовое сообщение отправлено успешно",
        details: result.result,
      }
    } catch (error) {
      return {
        success: false,
        message: `Ошибка отправки сообщения: ${error}`,
      }
    }
  }

  public async testFormSubmission(): Promise<TelegramTestResult> {
    console.log("📋 Тестирование отправки формы...")

    const formData = {
      name: "Тестовый Пользователь",
      email: "test@example.com",
      phone: "+7 (999) 123-45-67",
      subject: "Тестирование формы",
      message: "Это тестовое сообщение для проверки работы формы обратной связи.",
    }

    const message = `📝 Новое обращение с сайта

👤 Имя: ${formData.name}
📧 Email: ${formData.email}
📞 Телефон: ${formData.phone}
📋 Тема: ${formData.subject}

💬 Сообщение:
${formData.message}

⏰ Время: ${new Date().toLocaleString("ru-RU")}
🔧 Тип: Тестовое сообщение`

    try {
      const result = await this.makeRequest("sendMessage", {
        chat_id: this.chatId,
        text: message,
        parse_mode: "HTML",
      })

      return {
        success: true,
        message: "Тестовая форма отправлена успешно",
        details: result.result,
      }
    } catch (error) {
      return {
        success: false,
        message: `Ошибка отправки формы: ${error}`,
      }
    }
  }

  public async runAllTests(): Promise<{
    overall: boolean
    results: { [key: string]: TelegramTestResult }
  }> {
    const results: { [key: string]: TelegramTestResult } = {}

    // Проверка конфигурации
    results.configuration = await this.checkConfiguration()
    if (!results.configuration.success) {
      return { overall: false, results }
    }

    // Тест соединения
    results.connection = await this.testConnection()
    if (!results.connection.success) {
      return { overall: false, results }
    }

    // Тест доступа к чату
    results.chatAccess = await this.testChatAccess()
    if (!results.chatAccess.success) {
      return { overall: false, results }
    }

    // Тест отправки сообщения
    results.testMessage = await this.sendTestMessage()

    // Тест формы
    results.formSubmission = await this.testFormSubmission()

    const overall = Object.values(results).every((r) => r.success)

    return { overall, results }
  }
}

// Функция для форматирования результатов
function formatResults(overall: boolean, results: { [key: string]: TelegramTestResult }) {
  console.log("\n" + "=".repeat(60))
  console.log("🤖 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ TELEGRAM")
  console.log("=".repeat(60))

  // Общий статус
  const statusIcon = overall ? "✅" : "❌"
  const statusText = overall ? "ВСЕ ТЕСТЫ ПРОЙДЕНЫ" : "ОБНАРУЖЕНЫ ПРОБЛЕМЫ"
  console.log(`\n${statusIcon} ${statusText}`)

  // Детальные результаты
  console.log("\n📋 Детальные результаты:")

  const testNames = {
    configuration: "🔧 Конфигурация",
    connection: "🌐 Соединение",
    chatAccess: "💬 Доступ к чату",
    testMessage: "📤 Тестовое сообщение",
    formSubmission: "📋 Отправка формы",
  }

  for (const [key, result] of Object.entries(results)) {
    const icon = result.success ? "✅" : "❌"
    const testName = testNames[key as keyof typeof testNames] || key
    console.log(`   ${icon} ${testName}: ${result.message}`)

    if (result.details && result.success) {
      if (key === "connection" && result.details.username) {
        console.log(`      └─ Бот: @${result.details.username}`)
      }
      if (key === "chatAccess" && result.details.title) {
        console.log(`      └─ Чат: ${result.details.title}`)
      }
    }
  }

  // Рекомендации
  console.log("\n💡 Рекомендации:")

  if (!overall) {
    console.log("   • Исправьте обнаруженные проблемы перед запуском в продакшн")

    if (!results.configuration?.success) {
      console.log("   • Проверьте переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID")
    }

    if (!results.connection?.success) {
      console.log("   • Убедитесь, что токен бота корректен и бот активен")
    }

    if (!results.chatAccess?.success) {
      console.log("   • Добавьте бота в чат и дайте ему права на отправку сообщений")
    }
  } else {
    console.log("   • Система Telegram уведомлений настроена корректно")
    console.log("   • Регулярно проверяйте работоспособность")
    console.log("   • Следите за лимитами Telegram API")
  }

  console.log("\n" + "=".repeat(60))
}

// Запуск тестирования
async function main() {
  try {
    const tester = new TelegramTester()
    const { overall, results } = await tester.runAllTests()

    formatResults(overall, results)

    // Возвращаем код выхода в зависимости от результата
    process.exit(overall ? 0 : 1)
  } catch (error) {
    console.error("❌ Критическая ошибка при тестировании Telegram:", error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { TelegramTester, type TelegramTestResult }
