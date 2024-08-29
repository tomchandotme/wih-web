"use client"

/* eslint-disable @next/next/no-img-element */
import { ModData } from "@/items/mods"
import { cn } from "@/lib/utils"
import { useModWishlist } from "@/store/useModWishlist"
import { Bookmark, BookmarkCheck } from "lucide-react"

export const ModCard = ({
  mod,
  hideWishlist,
}: {
  mod: ModData
  hideWishlist?: boolean
}) => {
  const { isWishlisted, toggleWishlist } = useModWishlist(mod.rawName)
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-current bg-current p-2",
        {
          "text-yellow-900": mod.rarity === "Common",
          "text-zinc-400": mod.rarity === "Uncommon",
          "text-amber-300": mod.rarity === "Rare",
          "text-zinc-200": mod.rarity === "Legendary",
          "text-orange-200": mod.rawName.startsWith("Archon"),
          "text-slate-400": mod.rawName.startsWith("Galvanized"),
        },
      )}
    >
      <img
        className="square size-40 rounded-lg object-cover"
        src={mod.imageUrl}
        alt={mod.name}
      />

      <div className="flex w-40 flex-1 flex-col justify-center gap-2 overflow-hidden pt-2 text-black">
        <div className="text-sm font-bold">{mod.name}</div>
        <div className="text-xs">{mod.description}</div>
        <div className="text-xs">{mod.compatName}</div>
        {!hideWishlist && (
          <div
            onClick={toggleWishlist}
            className="flex flex-1 cursor-pointer items-end justify-end text-xs font-medium underline"
          >
            {isWishlisted ? <BookmarkCheck /> : <Bookmark />}
          </div>
        )}
      </div>
    </div>
  )
}
