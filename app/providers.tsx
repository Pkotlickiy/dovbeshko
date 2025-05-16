"use client"

import { type ReactNode, useEffect, useState } from "react"
import TimeContext from "@/contexts/time-context"

type TimeOfDay = "morning" | "afternoon" | "evening" | "night"

export default function Providers({ children }: { children: ReactNode }) {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning")

  useEffect(() => {
    const determineTimeOfDay = (): TimeOfDay => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 12) return "morning"
      if (hour >= 12 && hour < 17) return "afternoon"
      if (hour >= 17 && hour < 22) return "evening"
      return "night"
    }

    // Set initial time of day
    setTimeOfDay(determineTimeOfDay())

    // Update time of day every hour
    const interval = setInterval(
      () => {
        setTimeOfDay(determineTimeOfDay())
      },
      60 * 60 * 1000,
    ) // Check every hour

    return () => clearInterval(interval)
  }, [])

  return <TimeContext.Provider value={timeOfDay}>{children}</TimeContext.Provider>
}
