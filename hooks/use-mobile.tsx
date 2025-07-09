"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface MobileContextType {
  isMobile: boolean
}

const MobileContext = createContext<MobileContextType | undefined>(undefined)

interface MobileProviderProps {
  children: ReactNode
}

export function MobileProvider({ children }: MobileProviderProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileDevice = mobileRegex.test(userAgent)
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return <MobileContext.Provider value={{ isMobile }}>{children}</MobileContext.Provider>
}

export function useIsMobile(): boolean {
  const context = useContext(MobileContext)
  if (context === undefined) {
    throw new Error("useIsMobile must be used within a MobileProvider")
  }
  return context.isMobile
}

// Экспорт для совместимости
export const useMobile = () => {
  const isMobile = useIsMobile()
  return { isMobile }
}
