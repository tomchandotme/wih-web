"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type SiteNavProps = {
  categories: string[]
}

const navLabel = (name: string) =>
  name.endsWith(" Mods") ? name.slice(0, -" Mods".length) : name

export const SiteNav = ({ categories }: SiteNavProps) => {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const navRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const navHeightRef = useRef(0)

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    const sync = () => {
      navHeightRef.current = el.offsetHeight
      document.documentElement.style.scrollPaddingTop = `${el.offsetHeight}px`
    }
    sync()

    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => {
      ro.disconnect()
      document.documentElement.style.scrollPaddingTop = ""
    }
  }, [])

  useEffect(() => {
    if (!isHome) return

    let frame = 0
    const update = () => {
      const navHeight = navHeightRef.current
      let current: string | null = null
      for (const c of categories) {
        const section = document.getElementById(c)
        if (!section) continue
        if (section.getBoundingClientRect().top - navHeight <= 1) {
          current = c
        }
      }
      setActiveSection((prev) => (prev === current ? prev : current))
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    // Search/filter remounts section headings without scrolling.
    const root = navRef.current?.parentElement
    let mo: MutationObserver | null = null
    if (root) {
      mo = new MutationObserver(schedule)
      mo.observe(root, { childList: true, subtree: true })
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      mo?.disconnect()
    }
  }, [isHome, categories])

  const linkClass = (active: boolean) =>
    cn(
      "h-auto shrink-0 rounded-none border-b-2 border-transparent px-3 py-3 font-mono text-xs tracking-wide uppercase transition-colors",
      active
        ? "border-brand text-foreground"
        : "text-muted-foreground hover:text-foreground",
    )

  return (
    <div
      ref={navRef}
      className="bg-background/90 sticky top-0 z-20 border-b backdrop-blur-sm"
    >
      <div className="container mx-auto flex flex-nowrap items-stretch justify-start gap-1 overflow-x-auto px-4">
        {categories.map((c) => (
          <Button
            variant="ghost"
            size="sm"
            key={`button_${c}`}
            className={linkClass(isHome && activeSection === c)}
            asChild
          >
            <Link href={`/#${c}`}>{navLabel(c)}</Link>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className={linkClass(pathname === "/owned")}
          asChild
        >
          <Link href="/owned">Owned</Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={linkClass(pathname === "/wishlisted")}
          asChild
        >
          <Link href="/wishlisted">Wishlisted</Link>
        </Button>
        {!isHome && (
          <Button variant="ghost" size="sm" className={linkClass(false)} asChild>
            <Link href="/">All Mods</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
