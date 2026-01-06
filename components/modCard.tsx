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
import _ from "lodash"
import { useState } from "react"
import { ModData } from "@/types"
import { RARITY_COLORS } from "@/lib/constants"

export const ModCard = ({
  mod,
  hideAction,
  showDrops: initShowDrops,
}: {
  mod: ModData
  hideAction?: boolean
  showDrops?: boolean
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

  const badgeColor = cn("mr-2 font-mono", {
    [rarityColor]: !!rarityColor,
    "text-white": mod.rarity === "Common",
    "bg-orange-200": isArchon,
    "bg-slate-400": isGalvanized,
  })

  return (
    <Card className="relative flex flex-row overflow-hidden pl-4 hover:shadow-md">
      <div className={sideBarColor} />
      <div className="grow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {mod.name}
            <Badge variant="secondary" className="font-mono">
              {mod.compatName?.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center">
            <img
              src={mod.imageUrl}
              alt={mod.name}
              width={100}
              height={100}
              className="mr-4"
              loading="lazy"
            />
            <div>
              <p className="mb-2 text-sm whitespace-pre-line tabular-nums">
                {mod.description}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className={badgeColor}>
              {mod.rarity}
            </Badge>
          </div>
          {mod.drops && mod.drops.length > 0 && (
            <Collapsible onOpenChange={setShowDrops} open={showDrops}>
              <CollapsibleTrigger>
                <div className="flex cursor-pointer items-center justify-center gap-2">
                  <span className="font font-mono text-sm font-medium">
                    Drops
                  </span>
                  <ChevronDown
                    className={cn("size-4", { "rotate-180": showDrops })}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="list-inside list-disc font-mono text-xs">
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
        <div className="flex flex-col justify-start space-y-2 border-l p-4">
          <Button
            variant={isOwned ? "default" : "outline"}
            size="icon"
            onClick={() => toggleOwnList()}
            aria-label={isOwned ? "Mark as not owned" : "Mark as owned"}
          >
            <CheckIcon className="size-4" />
          </Button>

          <Button
            variant={isWishlisted ? "default" : "outline"}
            size="icon"
            onClick={() => toggleWishlist()}
            aria-label={isWishlisted ? "Unpin" : "Pin"}
          >
            <PinIcon className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            asChild
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
            variant="outline"
            size="icon"
            asChild
            disabled={!mod.tradable}
          >
            {mod.tradable ? (
              <a
                href={`https://warframe.market/items/${_.snakeCase(mod.rawName)}`}
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
