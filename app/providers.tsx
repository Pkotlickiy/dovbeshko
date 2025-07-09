"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { MobileProvider } from "@/hooks/use-mobile"
import { AppProvider } from "@/contexts/app-context"
import { ErrorBoundary } from "@/components/error-boundary"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <MobileProvider>
          <AppProvider>{children}</AppProvider>
        </MobileProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
