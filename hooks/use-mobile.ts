"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

export type MobileContextType = {
  isMobile: boolean
}

const MobileContext = createContext<MobileContextType>({ isMobile: false })

export function useMobile() {
  const context = useContext(MobileContext)
  if (!context) {
    throw new Error("useMobile must be used within a MobileProvider")
  }
  return context
}

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return <MobileContext.Provider value={{ isMobile }}>{children}</MobileContext.Provider>
}

// Add named export for backward compatibility
export { useMobile as default }
