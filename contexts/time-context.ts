import { createContext } from "react"

type TimeOfDay = "morning" | "afternoon" | "evening" | "night"

const TimeContext = createContext<TimeOfDay>("morning")

export default TimeContext
