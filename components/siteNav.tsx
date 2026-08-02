"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SiteNavProps = {
  categories: string[]
}

export const SiteNav = ({ categories }: SiteNavProps) => {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div className="bg-background/95 sticky top-0 z-20 mx-auto mb-6 flex flex-wrap items-center justify-center gap-2 border-b py-4 backdrop-blur-sm">
      {categories.map((c) => (
        <Button variant="ghost" key={`button_${c}`} asChild>
          <Link href={`/#${c}`}>{c}</Link>
        </Button>
      ))}
      <Button
        variant={pathname === "/owned" ? "default" : "ghost"}
        asChild
      >
        <Link href="/owned">Owned</Link>
      </Button>
      <Button
        variant={pathname === "/wishlisted" ? "default" : "ghost"}
        asChild
      >
        <Link href="/wishlisted">Wishlisted</Link>
      </Button>
      {!isHome && (
        <Button variant="ghost" asChild>
          <Link href="/">All Mods</Link>
        </Button>
      )}
    </div>
  )
}
