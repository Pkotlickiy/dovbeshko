import fs from "fs"
import path from "path"
import { promisify } from "util"

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const stat = promisify(fs.stat)

// Паттерн для поиска импортов из @/lib/seo-config
const importPattern = /from\s+['"]@\/lib\/seo-config['"]/g

// Функция для рекурсивного обхода директорий
async function walkDir(dir: string): Promise<string[]> {
  const files: string[] = []
  const entries = await readdir(dir)

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stats = await stat(fullPath)

    if (stats.isDirectory()) {
      // Пропускаем node_modules и .next
      if (entry !== "node_modules" && entry !== ".next" && entry !== ".git") {
        const subFiles = await walkDir(fullPath)
        files.push(...subFiles)
      }
    } else if (stats.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry)) {
      files.push(fullPath)
    }
  }

  return files
}

// Функция для проверки файла на наличие импортов из @/lib/seo-config
async function checkFile(filePath: string): Promise<{ file: string; matches: string[] }> {
  const content = await readFile(filePath, "utf-8")
  const matches: string[] = []

  let match
  while ((match = importPattern.exec(content)) !== null) {
    const line = content.substring(0, match.index).split("\n").length
    matches.push(`Line ${line}: ${match[0]}`)
  }

  return { file: filePath, matches }
}

// Основная функция
async function main() {
  try {
    const rootDir = process.cwd()
    const files = await walkDir(rootDir)

    let hasIncorrectImports = false

    for (const file of files) {
      const result = await checkFile(file)
      if (result.matches.length > 0) {
        hasIncorrectImports = true
        console.log(`\x1b[31mIncorrect imports found in ${result.file}:\x1b[0m`)
        result.matches.forEach((match) => console.log(`  - ${match}`))
      }
    }

    if (!hasIncorrectImports) {
      console.log("\x1b[32mNo incorrect imports found. All imports are using @/lib/seo correctly.\x1b[0m")
      process.exit(0)
    } else {
      console.log("\x1b[31mIncorrect imports found. Please fix them before continuing.\x1b[0m")
      process.exit(1)
    }
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

main()
