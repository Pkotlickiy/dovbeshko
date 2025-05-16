"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { AnimatedLogo } from "./animated-logo"

// Типы для навигационных элементов
interface NavItem {
  href: string
  label: string
  anchor?: string
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const isHomePage = pathname === "/"

  // Навигационные элементы
  const navItems: NavItem[] = [
    { label: "Главная", href: "/" },
    { label: "Услуги", href: "/services" },
    { label: "Практика", href: "/practice" },
    { label: "Контакты", href: "/contacts" },
    { label: "Записаться", href: "/booking" },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    // Mark as loaded after a short delay to ensure animations play properly
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, isMobile])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Функция для создания ссылки с учетом якорей на главной странице
  const createNavLink = (item: NavItem) => {
    const { href, anchor } = item

    if (isHomePage && anchor) {
      return {
        href: `#${anchor}`,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          const element = document.getElementById(anchor)
          if (element) {
            const headerOffset = 100 // Учитываем высоту шапки
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })
          }
        },
      }
    }

    // Если не главная страница и есть якорь, добавляем его к ссылке на главную
    if (!isHomePage && anchor) {
      return {
        href: `/${anchor ? "#" + anchor : ""}`,
      }
    }

    // Обычная ссылка без якоря
    return { href }
  }

  // Navigation item animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  // Компонент для отображения навигационного элемента
  const NavItem = ({ item, index, isMobile = false }: { item: NavItem; index: number; isMobile?: boolean }) => {
    const navLink = createNavLink(item)

    return (
      <motion.li
        key={item.label}
        custom={index}
        initial={isMobile ? { opacity: 0, y: 20 } : "hidden"}
        animate={isMobile ? { opacity: 1, y: 0 } : "visible"}
        variants={!isMobile ? navItemVariants : undefined}
        transition={isMobile ? { duration: 0.3, delay: 0.1 + index * 0.1 } : undefined}
      >
        <Link
          href={navLink.href}
          onClick={(e) => {
            if (navLink.onClick) {
              navLink.onClick(e)
            }
            if (isMobile) {
              setIsOpen(false)
            }
          }}
          className={cn(
            isMobile
              ? "text-xl font-medium"
              : "relative text-sm font-medium transition-colors duration-300 hover:text-[#741717]",
            pathname === item.href
              ? isMobile
                ? "text-[#741717]"
                : "text-[#741717] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#741717] after:content-['']"
              : isScrolled
                ? "text-[#603a30]"
                : "text-[#603a30]",
          )}
        >
          {item.label}
        </Link>
      </motion.li>
    )
  }

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center" aria-label="Адвокат Довбешко С.Ю. - Главная страница">
          {isLoaded && <AnimatedLogo isScrolled={isScrolled} isMobile={isMobile} />}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item, i) => (
              <NavItem key={item.label} item={item} index={i} />
            ))}
          </ul>
          <a
            href="tel:+79310070752"
            className="text-sm font-medium text-[#603a30] hover:text-[#741717] transition-colors duration-300"
          >
            +7 (931) 007-07-52
          </a>
          <Link
            href="/booking"
            className="bg-[#741717] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#8c1c1c] transition-colors duration-300"
          >
            Связаться
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={cn("z-50 flex flex-col items-center justify-center md:hidden", isOpen && "fixed right-4")}
          onClick={toggleMenu}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
        >
          <span className="sr-only">{isOpen ? "Закрыть меню" : "Открыть меню"}</span>
          <span
            className={cn(
              "mb-1 h-0.5 w-6 transform rounded-full bg-[#741717] transition duration-300 ease-in-out",
              isOpen && "translate-y-1.5 rotate-45",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 rounded-full bg-[#741717] transition-opacity duration-300 ease-in-out",
              isOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "mt-1 h-0.5 w-6 transform rounded-full bg-[#741717] transition duration-300 ease-in-out",
              isOpen && "-translate-y-1.5 -rotate-45",
            )}
          />
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 top-0 z-40 flex h-screen w-full flex-col bg-white p-6 pt-20"
            >
              <nav className="flex flex-col">
                <ul className="flex flex-col space-y-6">
                  {navItems.map((item, i) => (
                    <NavItem key={item.label} item={item} index={i} isMobile={true} />
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <a
                      href="tel:+79310070752"
                      className="text-xl font-medium text-[#603a30]"
                      onClick={() => setIsOpen(false)}
                    >
                      +7 (931) 007-07-52
                    </a>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Link
                      href="/booking"
                      className="inline-block bg-[#741717] text-white px-4 py-2 rounded-md text-xl font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Связаться
                    </Link>
                  </motion.li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
