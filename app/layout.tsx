import type { Metadata } from "next"
import { Noto_Sans_HK } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Provider } from "jotai"

const notoSansHK = Noto_Sans_HK({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "wih",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(notoSansHK.className, "h-full w-full")}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
