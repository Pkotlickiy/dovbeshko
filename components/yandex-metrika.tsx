"use client"

import { useEffect } from "react"

interface YandexMetrikaProps {
  counterId: string | number
}

export function YandexMetrika({ counterId }: YandexMetrikaProps) {
  useEffect(() => {
    ;((m, e, t, r, i, k, a) => {
      m[i] =
        m[i] ||
        (() => {
          ;(m[i].a = m[i].a || []).push(arguments)
        })
      m[i].l = 1 * new Date()
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return
        }
      }
      k = e.createElement(t)
      a = e.getElementsByTagName(t)[0]
      k.async = 1
      k.src = r
      a.parentNode.insertBefore(k, a)
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")

    window.ym(Number(counterId), "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true,
    })
  }, [counterId])

  return (
    <noscript>
      <div>
        <img src={`https://mc.yandex.ru/watch/${counterId}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
      </div>
    </noscript>
  )
}
