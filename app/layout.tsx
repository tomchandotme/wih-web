import type { Metadata } from "next"
import { Geist, Geist_Mono, Noto_Sans_HK } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Provider } from "jotai"
import { ScrollToTop } from "@/components/scrollToTop"
import { SiteNav } from "@/components/siteNav"
import { modSets } from "@/items/mods"

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
  title: "Warframe Item Helper",
  description:
    "Browse curated Warframe mods, track owned and wishlisted items, and find drop sources.",
  openGraph: {
    title: "Warframe Item Helper",
    description:
      "Browse curated Warframe mods, track owned and wishlisted items, and find drop sources.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = modSets.map((v) => v.name)

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
            <SiteNav categories={categories} />
            {children}
            <ScrollToTop />
          </div>
        </Provider>
      </body>
    </html>
  )
}
