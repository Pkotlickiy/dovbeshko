import { ImageResponse } from "next/og"

export const alt = "Запись подтверждена | Адвокат Довбешко С.Ю."
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
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h1
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Запись подтверждена
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
            fontSize: 20,
            color: "white",
            opacity: 0.7,
            marginTop: 20,
          }}
        >
          dovbeshko-lawyer.ru/booking/confirmation
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
