#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

interface SEOIssue {
  type: "error" | "warning" | "info"
  category: string
  message: string
  file?: string
  line?: number
}

interface SEOAuditResult {
  score: number
  issues: SEOIssue[]
  summary: {
    errors: number
    warnings: number
    info: number
  }
}

class SEOAuditor {
  private issues: SEOIssue[] = []
  private projectRoot: string

  constructor() {
    this.projectRoot = process.cwd()
  }

  private addIssue(type: SEOIssue["type"], category: string, message: string, file?: string, line?: number) {
    this.issues.push({ type, category, message, file, line })
  }

  private scanDirectory(dir: string, extensions: string[] = [".tsx", ".ts", ".js", ".jsx"]): string[] {
    const files: string[] = []

    try {
      const items = readdirSync(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const stat = statSync(fullPath)

        if (stat.isDirectory() && !item.startsWith(".") && item !== "node_modules") {
          files.push(...this.scanDirectory(fullPath, extensions))
        } else if (stat.isFile() && extensions.some((ext) => item.endsWith(ext))) {
          files.push(fullPath)
        }
      }
    } catch (error) {
      console.warn(`Не удалось прочитать директорию ${dir}:`, error)
    }

    return files
  }

  private checkMetadata() {
    console.log("🔍 Проверка метаданных...")

    // Проверяем layout.tsx
    try {
      const layoutPath = join(this.projectRoot, "app", "layout.tsx")
      const layoutContent = readFileSync(layoutPath, "utf-8")

      // Проверяем наличие базовых метаданных
      if (!layoutContent.includes("title:")) {
        this.addIssue("error", "Metadata", "Отсутствует title в layout.tsx", "app/layout.tsx")
      }

      if (!layoutContent.includes("description:")) {
        this.addIssue("error", "Metadata", "Отсутствует description в layout.tsx", "app/layout.tsx")
      }

      if (!layoutContent.includes("keywords:")) {
        this.addIssue("warning", "Metadata", "Отсутствуют keywords в layout.tsx", "app/layout.tsx")
      }

      if (!layoutContent.includes("openGraph:")) {
        this.addIssue("warning", "Metadata", "Отсутствует OpenGraph разметка", "app/layout.tsx")
      }
    } catch (error) {
      this.addIssue("error", "Metadata", "Не найден файл app/layout.tsx")
    }

    // Проверяем страницы на наличие метаданных
    const pageFiles = this.scanDirectory(join(this.projectRoot, "app")).filter(
      (file) => file.endsWith("page.tsx") || file.endsWith("page.ts"),
    )

    for (const pageFile of pageFiles) {
      try {
        const content = readFileSync(pageFile, "utf-8")
        const relativePath = pageFile.replace(this.projectRoot, "").substring(1)

        if (!content.includes("export const metadata") && !content.includes("generateMetadata")) {
          this.addIssue("warning", "Metadata", `Страница не содержит метаданных`, relativePath)
        }
      } catch (error) {
        this.addIssue("error", "Metadata", `Ошибка чтения файла ${pageFile}`)
      }
    }
  }

  private checkStructuredData() {
    console.log("🏗️ Проверка структурированных данных...")

    const files = this.scanDirectory(this.projectRoot)
    let hasStructuredData = false

    for (const file of files) {
      try {
        const content = readFileSync(file, "utf-8")
        const relativePath = file.replace(this.projectRoot, "").substring(1)

        if (content.includes("@context") && content.includes("schema.org")) {
          hasStructuredData = true
          this.addIssue("info", "Structured Data", `Найдена Schema.org разметка`, relativePath)
        }

        if (content.includes("LocalBusiness")) {
          this.addIssue("info", "Structured Data", `Найдена разметка LocalBusiness`, relativePath)
        }

        if (content.includes("Attorney")) {
          this.addIssue("info", "Structured Data", `Найдена разметка Attorney`, relativePath)
        }
      } catch (error) {
        // Игнорируем ошибки чтения файлов
      }
    }

    if (!hasStructuredData) {
      this.addIssue("error", "Structured Data", "Не найдена Schema.org разметка")
    }
  }

  private checkImages() {
    console.log("🖼️ Проверка изображений...")

    const files = this.scanDirectory(this.projectRoot)

    for (const file of files) {
      try {
        const content = readFileSync(file, "utf-8")
        const relativePath = file.replace(this.projectRoot, "").substring(1)

        // Проверяем img теги без alt
        const imgMatches = content.match(/<img[^>]*>/g)
        if (imgMatches) {
          for (const img of imgMatches) {
            if (!img.includes("alt=")) {
              this.addIssue("error", "Images", `Изображение без alt атрибута`, relativePath)
            }
          }
        }

        // Проверяем Image компоненты без alt
        const imageMatches = content.match(/<Image[^>]*>/g)
        if (imageMatches) {
          for (const image of imageMatches) {
            if (!image.includes("alt=")) {
              this.addIssue("error", "Images", `Image компонент без alt атрибута`, relativePath)
            }
          }
        }
      } catch (error) {
        // Игнорируем ошибки чтения файлов
      }
    }
  }

  private checkInternalLinks() {
    console.log("🔗 Проверка внутренних ссылок...")

    const files = this.scanDirectory(this.projectRoot)
    let hasNavigation = false

    for (const file of files) {
      try {
        const content = readFileSync(file, "utf-8")
        const relativePath = file.replace(this.projectRoot, "").substring(1)

        // Проверяем наличие навигации
        if (content.includes("nav") || content.includes("Navigation")) {
          hasNavigation = true
          this.addIssue("info", "Navigation", `Найдена навигация`, relativePath)
        }

        // Проверяем Link компоненты
        const linkMatches = content.match(/<Link[^>]*href=["']([^"']*)/g)
        if (linkMatches) {
          for (const link of linkMatches) {
            const href = link.match(/href=["']([^"']*)/)?.[1]
            if (href && href.startsWith("http") && !href.includes(process.env.NEXT_PUBLIC_BASE_URL || "")) {
              this.addIssue("info", "Links", `Внешняя ссылка: ${href}`, relativePath)
            }
          }
        }
      } catch (error) {
        // Игнорируем ошибки чтения файлов
      }
    }

    if (!hasNavigation) {
      this.addIssue("warning", "Navigation", "Не найдена основная навигация")
    }
  }

  private checkPerformance() {
    console.log("⚡ Проверка производительности...")

    // Проверяем next.config.js
    try {
      const configPath = join(this.projectRoot, "next.config.mjs")
      const configContent = readFileSync(configPath, "utf-8")

      if (!configContent.includes("images:")) {
        this.addIssue("warning", "Performance", "Не настроена оптимизация изображений в next.config.mjs")
      }

      if (!configContent.includes("compress:")) {
        this.addIssue("info", "Performance", "Рекомендуется включить сжатие в next.config.mjs")
      }
    } catch (error) {
      this.addIssue("warning", "Performance", "Не найден файл next.config.mjs")
    }

    // Проверяем использование динамических импортов
    const files = this.scanDirectory(this.projectRoot)
    let hasDynamicImports = false

    for (const file of files) {
      try {
        const content = readFileSync(file, "utf-8")

        if (content.includes("dynamic(") || content.includes("lazy(")) {
          hasDynamicImports = true
          break
        }
      } catch (error) {
        // Игнорируем ошибки чтения файлов
      }
    }

    if (!hasDynamicImports) {
      this.addIssue("info", "Performance", "Рекомендуется использовать динамические импорты для больших компонентов")
    }
  }

  private checkMobileOptimization() {
    console.log("📱 Проверка мобильной оптимизации...")

    // Проверяем viewport в layout.tsx
    try {
      const layoutPath = join(this.projectRoot, "app", "layout.tsx")
      const layoutContent = readFileSync(layoutPath, "utf-8")

      if (!layoutContent.includes("viewport") && !layoutContent.includes("width=device-width")) {
        this.addIssue("error", "Mobile", "Отсутствует viewport meta tag")
      }
    } catch (error) {
      this.addIssue("error", "Mobile", "Не найден файл app/layout.tsx")
    }

    // Проверяем использование responsive классов
    const files = this.scanDirectory(this.projectRoot)
    let hasResponsiveClasses = false

    for (const file of files) {
      try {
        const content = readFileSync(file, "utf-8")

        if (content.includes("md:") || content.includes("lg:") || content.includes("sm:")) {
          hasResponsiveClasses = true
          break
        }
      } catch (error) {
        // Игнорируем ошибки чтения файлов
      }
    }

    if (!hasResponsiveClasses) {
      this.addIssue("warning", "Mobile", "Не найдены responsive CSS классы")
    }
  }

  private checkSEOFiles() {
    console.log("📄 Проверка SEO файлов...")

    // Проверяем robots.txt
    try {
      const robotsPath = join(this.projectRoot, "app", "robots.ts")
      readFileSync(robotsPath, "utf-8")
      this.addIssue("info", "SEO Files", "Найден файл robots.ts")
    } catch (error) {
      this.addIssue("warning", "SEO Files", "Не найден файл robots.ts")
    }

    // Проверяем sitemap
    try {
      const sitemapPath = join(this.projectRoot, "app", "sitemap.ts")
      readFileSync(sitemapPath, "utf-8")
      this.addIssue("info", "SEO Files", "Найден файл sitemap.ts")
    } catch (error) {
      this.addIssue("warning", "SEO Files", "Не найден файл sitemap.ts")
    }
  }

  private checkHeadingStructure() {
    console.log("📝 Проверка структуры заголовков...")

    const files = this.scanDirectory(this.projectRoot)

    for (const file of files) {
      try {
        const content = readFileSync(file, "utf-8")
        const relativePath = file.replace(this.projectRoot, "").substring(1)

        // Проверяем наличие H1
        const h1Matches = content.match(/<h1[^>]*>|className="[^"]*text-[^"]*xl[^"]*"/g)
        if (h1Matches && h1Matches.length > 1) {
          this.addIssue("warning", "Headings", `Найдено несколько H1 заголовков`, relativePath)
        }

        // Проверяем последовательность заголовков
        const headingMatches = content.match(/<h[1-6][^>]*>/g)
        if (headingMatches) {
          const levels = headingMatches.map((h) => Number.parseInt(h.match(/h([1-6])/)?.[1] || "1"))
          for (let i = 1; i < levels.length; i++) {
            if (levels[i] - levels[i - 1] > 1) {
              this.addIssue("warning", "Headings", `Нарушена последовательность заголовков`, relativePath)
              break
            }
          }
        }
      } catch (error) {
        // Игнорируем ошибки чтения файлов
      }
    }
  }

  public async runAudit(): Promise<SEOAuditResult> {
    console.log("🚀 Запуск SEO аудита...\n")

    this.checkMetadata()
    this.checkStructuredData()
    this.checkImages()
    this.checkInternalLinks()
    this.checkPerformance()
    this.checkMobileOptimization()
    this.checkSEOFiles()
    this.checkHeadingStructure()

    const summary = {
      errors: this.issues.filter((i) => i.type === "error").length,
      warnings: this.issues.filter((i) => i.type === "warning").length,
      info: this.issues.filter((i) => i.type === "info").length,
    }

    // Вычисляем общий балл
    const maxScore = 100
    const errorPenalty = summary.errors * 10
    const warningPenalty = summary.warnings * 5
    const score = Math.max(0, maxScore - errorPenalty - warningPenalty)

    return {
      score,
      issues: this.issues,
      summary,
    }
  }
}

// Функция для форматирования результатов
function formatResults(result: SEOAuditResult) {
  console.log("\n" + "=".repeat(60))
  console.log("📊 РЕЗУЛЬТАТЫ SEO АУДИТА")
  console.log("=".repeat(60))

  // Общий балл
  const scoreColor = result.score >= 80 ? "🟢" : result.score >= 60 ? "🟡" : "🔴"
  console.log(`\n${scoreColor} Общий балл: ${result.score}/100`)

  // Сводка
  console.log(`\n📈 Сводка:`)
  console.log(`   🔴 Ошибки: ${result.summary.errors}`)
  console.log(`   🟡 Предупреждения: ${result.summary.warnings}`)
  console.log(`   🔵 Информация: ${result.summary.info}`)

  // Группировка по категориям
  const categories = [...new Set(result.issues.map((i) => i.category))]

  for (const category of categories) {
    const categoryIssues = result.issues.filter((i) => i.category === category)
    console.log(`\n📂 ${category}:`)

    for (const issue of categoryIssues) {
      const icon = issue.type === "error" ? "🔴" : issue.type === "warning" ? "🟡" : "🔵"
      const fileInfo = issue.file ? ` (${issue.file})` : ""
      console.log(`   ${icon} ${issue.message}${fileInfo}`)
    }
  }

  // Рекомендации
  console.log(`\n💡 Рекомендации:`)

  if (result.summary.errors > 0) {
    console.log(`   • Исправьте ${result.summary.errors} критических ошибок`)
  }

  if (result.summary.warnings > 5) {
    console.log(`   • Обратите внимание на ${result.summary.warnings} предупреждений`)
  }

  if (result.score < 80) {
    console.log(`   • Улучшите SEO оптимизацию для повышения балла`)
  }

  console.log(`   • Регулярно проводите SEO аудит`)
  console.log(`   • Следите за обновлениями поисковых алгоритмов`)

  console.log("\n" + "=".repeat(60))
}

// Запуск аудита
async function main() {
  try {
    const auditor = new SEOAuditor()
    const result = await auditor.runAudit()
    formatResults(result)

    // Возвращаем код выхода в зависимости от результата
    process.exit(result.summary.errors > 0 ? 1 : 0)
  } catch (error) {
    console.error("❌ Ошибка при выполнении SEO аудита:", error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { SEOAuditor, type SEOAuditResult, type SEOIssue }
