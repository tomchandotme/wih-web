"use client"
import { ArrowUp } from "lucide-react"
import { Button } from "./ui/button"

export const ScrollToTop = () => (
  <div className="fixed bottom-2 right-2 z-50 shadow">
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        if (window) window.scrollTo({ top: 0, behavior: "smooth" })
      }}
      aria-label={"Scroll To Top"}
    >
      <ArrowUp />
    </Button>
  </div>
)
