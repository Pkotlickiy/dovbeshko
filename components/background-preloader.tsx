"use client"

import { useEffect, useState } from "react"

export function BackgroundPreloader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = "/vintage-books-bg.png"
    img.onload = () => setLoaded(true)
  }, [])

  return <>{!loaded && <div className="fixed inset-0 bg-[#f8f5f2] z-[-2]" aria-hidden="true" />}</>
}
