#!/usr/bin/env node

import { SEOAuditor, type SEOAuditResult } from "./seo-audit"
import { TelegramTester, type TelegramTestResult } from "./telegram-test"

interface HealthCheckResult {
  overall: {
    score: number
    status: "excellent" | "good" | "fair" | "poor"
    critical_issues: number
  }
  seo: SEOAuditResult
  telegram: {
    working: boolean
    results: { [key: string]: TelegramTestResult }
  }
  recommendations: string[]
}

class WebsiteHealthChecker {
  public async runFullCheck(): Promise<HealthCheckResult> {
    console.log("🏥 Запуск комплексной проверки здоровья сайта...\n")

    // SEO аудит
    console.log("1️⃣ Проведение SEO аудита...")
    const seoAuditor = new SEOAuditor()
    const seoResult = await seoAuditor.runAudit()

    // Telegram тестирование
    console.log("\n2️⃣ Тестирование Telegram интеграции...")
    const telegramTester = new TelegramTester()
    const { overall: telegramWorking, results: telegramResults } = await telegramTester.runAllTests()

    // Вычисляем общий балл
    const seoWeight = 0.7
    const telegramWeight = 0.3
    const telegramScore = telegramWorking ? 100 : 0
    const overallScore = Math.round(seoResult.score * seoWeight + telegramScore * telegramWeight)

    // Определяем статус
    let status: "excellent" | "good" | "fair" | "poor"
    if (overallScore >= 90) status = "excellent"
    else if (overallScore >= 75) status = "good"
    else if (overallScore >= 60) status = "fair"
    else status = "poor"

    // Подсчитываем критические проблемы
    const criticalIssues = seoResult.summary.errors + (telegramWorking ? 0 : 1)

    // Генерируем рекомендации
    const recommendations = this.generateRecommendations(seoResult, telegramWorking, overallScore)

    return {
      overall: {
        score: overallScore,
        status,
        critical_issues: criticalIssues,
      },
      seo: seoResult,
      telegram: {
        working: telegramWorking,
        results: telegramResults,
      },
      recommendations,
    }
  }

  private generateRecommendations(seoResult: SEOAuditResult, telegramWorking: boolean, overallScore: number): string[] {
    const recommendations: string[] = []

    // SEO рекомендации
    if (seoResult.summary.errors > 0) {
      recommendations.push(`Исправьте ${seoResult.summary.errors} критических SEO ошибок`)
    }

    if (seoResult.summary.warnings > 5) {
      recommendations.push(`Обратите внимание на ${seoResult.summary.warnings} SEO предупреждений`)
    }

    // Telegram рекомендации
    if (!telegramWorking) {
      recommendations.push("Настройте Telegram интеграцию для получения уведомлений")
    }

    // Общие рекомендации по баллу
    if (overallScore < 60) {
      recommendations.push("Требуется серьезная оптимизация сайта")
    } else if (overallScore < 80) {
      recommendations.push("Рекомендуется улучшить SEO и производительность")
    }

    // Специфические рекомендации
    const hasMetadataIssues = seoResult.issues.some((i) => i.category === "Metadata" && i.type === "error")
    if (hasMetadataIssues) {
      recommendations.push("Добавьте недостающие метаданные на страницы")
    }

    const hasImageIssues = seoResult.issues.some((i) => i.category === "Images" && i.type === "error")
    if (hasImageIssues) {
      recommendations.push("Добавьте alt атрибуты ко всем изображениям")
    }

    const hasStructuredDataIssues = seoResult.issues.some((i) => i.category === "Structured Data" && i.type === "error")
    if (hasStructuredDataIssues) {
      recommendations.push("Добавьте Schema.org разметку для лучшей индексации")
    }

    // Если все хорошо
    if (recommendations.length === 0) {
      recommendations.push("Сайт в отличном состоянии! Продолжайте мониторинг")
      recommendations.push("Регулярно проводите проверки для поддержания качества")
    }

    return recommendations
  }
}

// Функция для форматирования результатов
function formatHealthCheckResults(result: HealthCheckResult) {
  console.log("\n" + "=".repeat(70))
  console.log("🏥 КОМПЛЕКСНАЯ ПРОВЕРКА ЗДОРОВЬЯ САЙТА")
  console.log("=".repeat(70))

  // Общий статус
  const statusIcons = {
    excellent: "🟢",
    good: "🟡",
    fair: "🟠",
    poor: "🔴",
  }

  const statusTexts = {
    excellent: "ОТЛИЧНО",
    good: "ХОРОШО",
    fair: "УДОВЛЕТВОРИТЕЛЬНО",
    poor: "ТРЕБУЕТ ВНИМАНИЯ",
  }

  console.log(`\n${statusIcons[result.overall.status]} Общий статус: ${statusTexts[result.overall.status]}`)
  console.log(`📊 Общий балл: ${result.overall.score}/100`)
  console.log(`🚨 Критических проблем: ${result.overall.critical_issues}`)

  // SEO результаты
  console.log(`\n🔍 SEO Аудит:`)
  console.log(`   📊 Балл: ${result.seo.score}/100`)
  console.log(`   🔴 Ошибки: ${result.seo.summary.errors}`)
  console.log(`   🟡 Предупреждения: ${result.seo.summary.warnings}`)
  console.log(`   🔵 Информация: ${result.seo.summary.info}`)

  // Telegram результаты
  const telegramIcon = result.telegram.working ? "✅" : "❌"
  const telegramStatus = result.telegram.working ? "Работает" : "Не работает"
  console.log(`\n🤖 Telegram интеграция: ${telegramIcon} ${telegramStatus}`)

  // Топ проблемы
  const topIssues = result.seo.issues.filter((i) => i.type === "error").slice(0, 5)

  if (topIssues.length > 0) {
    console.log(`\n🚨 Топ проблемы:`)
    topIssues.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue.message} ${issue.file ? `(${issue.file})` : ""}`)
    })
  }

  // Рекомендации
  console.log(`\n💡 Рекомендации:`)
  result.recommendations.forEach((rec, index) => {
    console.log(`   ${index + 1}. ${rec}`)
  })

  // Следующие шаги
  console.log(`\n🎯 Следующие шаги:`)

  if (result.overall.critical_issues > 0) {
    console.log(`   1. Исправьте ${result.overall.critical_issues} критических проблем`)
    console.log(`   2. Повторите проверку после исправлений`)
  } else {
    console.log(`   1. Мониторьте производительность сайта`)
    console.log(`   2. Проводите регулярные проверки (раз в неделю)`)
  }

  console.log(`   3. Следите за обновлениями SEO требований`)
  console.log(`   4. Тестируйте новые функции перед развертыванием`)

  console.log("\n" + "=".repeat(70))
}

// Запуск полной проверки
async function main() {
  try {
    const healthChecker = new WebsiteHealthChecker()
    const result = await healthChecker.runFullCheck()

    formatHealthCheckResults(result)

    // Возвращаем код выхода в зависимости от результата
    const exitCode = result.overall.critical_issues > 0 ? 1 : 0
    process.exit(exitCode)
  } catch (error) {
    console.error("❌ Критическая ошибка при проверке здоровья сайта:", error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { WebsiteHealthChecker, type HealthCheckResult }
