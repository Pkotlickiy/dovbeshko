/**
 * Функция для расчета контрастности между двумя цветами по стандарту WCAG
 * @param foreground Цвет текста в формате HEX
 * @param background Цвет фона в формате HEX
 * @returns Значение контрастности
 */
export function calculateContrast(foreground: string, background: string): number {
  // Преобразуем HEX в RGB
  const fgRGB = hexToRgb(foreground)
  const bgRGB = hexToRgb(background)

  if (!fgRGB || !bgRGB) return 0

  // Рассчитываем относительную яркость
  const fgLuminance = calculateLuminance(fgRGB.r, fgRGB.g, fgRGB.b)
  const bgLuminance = calculateLuminance(bgRGB.r, bgRGB.g, bgRGB.b)

  // Рассчитываем контрастность
  const contrast =
    fgLuminance > bgLuminance
      ? (fgLuminance + 0.05) / (bgLuminance + 0.05)
      : (bgLuminance + 0.05) / (fgLuminance + 0.05)

  return Number.parseFloat(contrast.toFixed(2))
}

/**
 * Преобразует HEX цвет в RGB
 * @param hex Цвет в формате HEX
 * @returns Объект с RGB значениями или null при ошибке
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

/**
 * Рассчитывает относительную яркость цвета
 * @param r Красный компонент (0-255)
 * @param g Зеленый компонент (0-255)
 * @param b Синий компонент (0-255)
 * @returns Значение относительной яркости
 */
function calculateLuminance(r: number, g: number, b: number): number {
  // Нормализуем значения RGB
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  // Рассчитываем яркость по формуле WCAG
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * Проверяет, соответствует ли контрастность требованиям WCAG
 * @param contrast Значение контрастности
 * @param level Уровень соответствия ('AA' или 'AAA')
 * @param isLargeText Является ли текст крупным (>=18pt или >=14pt bold)
 * @returns Соответствует ли контрастность требованиям
 */
export function meetsContrastRequirements(contrast: number, level: "AA" | "AAA" = "AA", isLargeText = false): boolean {
  if (level === "AA") {
    return isLargeText ? contrast >= 3 : contrast >= 4.5
  } else {
    return isLargeText ? contrast >= 4.5 : contrast >= 7
  }
}
