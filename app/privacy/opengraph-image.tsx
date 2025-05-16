import { ImageResponse } from "next/og"

export const alt = "Политика конфиденциальности | Адвокат Довбешко С.Ю."
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#741717",
        padding: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Политика конфиденциальности
        </h1>

        <p
          style={{
            fontSize: 30,
            color: "white",
            opacity: 0.9,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Адвокат Довбешко С.Ю.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            marginBottom: 30,
          }}
        >
          {["Защита данных", "Адвокатская тайна", "Конфиденциальность"].map((tag, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                padding: "8px 16px",
                borderRadius: 4,
                fontSize: 18,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: 20,
            color: "white",
            opacity: 0.7,
            marginTop: 20,
          }}
        >
          dovbeshko-lawyer.ru/privacy
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
