"use client"
import { ArrowUp } from "lucide-react"
import { Button } from "./ui/button"

export const ScrollToTop = () => (
  <div className="fixed right-3 bottom-3 z-50">
    <Button
      variant="outline"
      size="icon"
      className="bg-card/90 border-brand/30 hover:border-brand/60 size-9 backdrop-blur-sm"
      onClick={() => {
        if (!window) return
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
          ? "auto"
          : "smooth"
        window.scrollTo({ top: 0, behavior })
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4" />
    </Button>
  </div>
)
