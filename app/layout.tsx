import type { Metadata } from "next"
import { Geist, Geist_Mono, Noto_Sans_HK } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Provider } from "jotai"
import { modSets } from "@/items/mods"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ScrollToTop } from "@/components/scrollToTop"

const notoSansHK = Noto_Sans_HK({
  subsets: ["latin"],
  variable: "--font-noto-sans-hk",
})
const geist = Geist({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-geist",
})
const geistMono = Geist_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "wih",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const category = modSets.map((v) => v.name)

  return (
    <html lang="en">
      <body
        className={cn(
          notoSansHK.variable,
          geist.variable,
          geistMono.variable,
          "h-full w-full",
        )}
      >
        <Provider>
          <div className="container mx-auto p-4">
            <div className="z-20 mx-auto mb-6 flex flex-wrap items-center justify-center gap-2 border-b py-6">
              {category.map((c) => (
                <Button variant="ghost" key={`button_${c}`} asChild>
                  <Link href={`/#${c}`}>{c}</Link>
                </Button>
              ))}
              <Button variant="ghost" asChild>
                <Link href={`/owned`}>Owned</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href={`/wishlisted`}>Wishlisted</Link>
              </Button>
            </div>
            {children}
            <ScrollToTop />
          </div>
        </Provider>
      </body>
    </html>
  )
}
