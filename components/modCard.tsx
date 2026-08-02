"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckIcon,
  PinIcon,
  Store,
  ChevronDown,
  BookOpenTextIcon,
} from "lucide-react"
import { useModOwnlist, useModWishlist } from "@/store/atoms"
import { cn } from "@/lib/utils"
import snakeCase from "lodash/snakeCase"
import Image from "next/image"
import { useState } from "react"
import { ModData } from "@/types"
import { RARITY_COLORS } from "@/lib/constants"

export const ModCard = ({
  mod,
  hideAction,
  showDrops: initShowDrops,
  priority,
}: {
  mod: ModData
  hideAction?: boolean
  showDrops?: boolean
  priority?: boolean
}) => {
  const [showDrops, setShowDrops] = useState(initShowDrops)

  const { isWishlisted, toggleWishlist } = useModWishlist(mod.rawName)
  const { isOwned, toggleOwnList } = useModOwnlist(mod.rawName)

  const rarityColor = mod.rarity ? RARITY_COLORS[mod.rarity] : ""
  const isArchon = mod.rawName.startsWith("Archon")
  const isGalvanized = mod.rawName.startsWith("Galvanized")

  const sideBarColor = cn("absolute top-0 left-0 h-full w-4", {
    [rarityColor]: !!rarityColor,
    "bg-orange-200": isArchon,
    "bg-slate-400": isGalvanized,
  })

  const badgeColor = cn("font-mono", {
    [rarityColor]: !!rarityColor,
    "text-white": mod.rarity === "Common",
    "bg-orange-200": isArchon,
    "bg-slate-400": isGalvanized,
  })

  return (
    <Card
      className={cn(
        "relative flex flex-row overflow-hidden pl-4 shadow-none transition-[border-color,background-color] duration-200 hover:border-brand/40",
        isOwned && "bg-muted/40",
      )}
    >
      <div className={sideBarColor} />
      <div className={cn("grow", isOwned && "opacity-70")}>
        <CardHeader className="px-4 pt-4 pb-3">
          <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-base">
            <span className="min-w-0">{mod.name}</span>
            <Badge
              variant="secondary"
              className="shrink-0 rounded-sm font-mono text-[10px] tracking-wide"
            >
              {mod.compatName?.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-4 pb-4">
          <div className="flex items-center">
            <Image
              src={mod.imageUrl}
              alt={mod.name}
              width={100}
              height={100}
              className="mr-4"
              priority={priority}
            />
            <div>
              <p className="mb-2 text-sm whitespace-pre-line tabular-nums">
                {mod.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={cn("rounded-sm", badgeColor)}>
              {mod.rarity}
            </Badge>
            {isOwned && (
              <Badge
                variant="secondary"
                className="rounded-sm font-mono text-[10px] tracking-wide"
              >
                Owned
              </Badge>
            )}
          </div>
          {mod.drops && mod.drops.length > 0 && (
            <Collapsible onOpenChange={setShowDrops} open={showDrops}>
              <CollapsibleTrigger>
                <div className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 transition-colors">
                  <span className="font-mono text-xs font-medium tracking-wide uppercase">
                    Drops
                  </span>
                  <ChevronDown
                    className={cn("size-3.5 transition-transform duration-200", {
                      "rotate-180": showDrops,
                    })}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="text-muted-foreground mt-2 list-inside list-disc font-mono text-xs">
                  {mod.drops.map((drop, index) => {
                    const { location, chance } = drop

                    const displayText = chance
                      ? `${drop.location} (${((drop.chance || 0) * 100).toFixed(2)}%)`
                      : location

                    return <li key={index}>{displayText}</li>
                  })}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          )}
        </CardContent>
      </div>
      {!hideAction && (
        <div className="bg-muted/30 flex flex-col justify-start gap-2 border-l p-3">
          <Button
            variant={isOwned ? "default" : "outline"}
            size="icon"
            className="size-9"
            onClick={() => toggleOwnList()}
            aria-label={isOwned ? "Mark as not owned" : "Mark as owned"}
          >
            <CheckIcon className="size-4" />
          </Button>

          <Button
            variant={isWishlisted ? "default" : "outline"}
            size="icon"
            className="size-9"
            onClick={() => toggleWishlist()}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <PinIcon className="size-4" />
          </Button>

          <Button
            className={cn("size-9", { "opacity-50": !mod.wikiaUrl })}
            variant="outline"
            size="icon"
            asChild={!!mod.wikiaUrl}
            disabled={!mod.wikiaUrl}
          >
            {mod.wikiaUrl ? (
              <a
                href={mod.wikiaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Wiki page"
              >
                <BookOpenTextIcon className="size-4" />
              </a>
            ) : (
              <BookOpenTextIcon className="size-4" />
            )}
          </Button>

          <Button
            className={cn("size-9", { "opacity-50": !mod.tradable })}
            variant="outline"
            size="icon"
            asChild={!!mod.tradable}
            disabled={!mod.tradable}
          >
            {mod.tradable ? (
              <a
                href={`https://warframe.market/items/${snakeCase(mod.rawName)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Warframe.market"
              >
                <Store className="size-4" />
              </a>
            ) : (
              <Store className="size-4" />
            )}
          </Button>
        </div>
      )}
    </Card>
  )
}
