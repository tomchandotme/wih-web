"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, PinIcon, ExternalLinkIcon, Store } from "lucide-react"
import { useModOwnlist, useModWishlist } from "@/store/atoms"
import { cn } from "@/lib/utils"
import _ from "lodash"

export const ModCard = ({
  mod,
  hideAction,
  showDrops,
}: {
  mod: ModData
  hideAction?: boolean
  showDrops?: boolean
}) => {
  const { isWishlisted, toggleWishlist } = useModWishlist(mod.rawName)
  const { isOwned, toggleOwnList } = useModOwnlist(mod.rawName)

  return (
    <Card className="relative flex flex-row overflow-hidden pl-4 hover:shadow-md">
      <div
        className={cn("absolute top-0 left-0 h-full w-4", {
          "bg-yellow-700": mod.rarity === "Common",
          "bg-zinc-400": mod.rarity === "Uncommon",
          "bg-amber-300": mod.rarity === "Rare",
          "bg-zinc-200": mod.rarity === "Legendary",
          "bg-orange-200": mod.rawName.startsWith("Archon"),
          "bg-slate-400": mod.rawName.startsWith("Galvanized"),
        })}
      />
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
            <Badge
              variant="outline"
              className={cn("mr-2 font-mono", {
                "bg-yellow-700 text-white": mod.rarity === "Common",
                "bg-zinc-400": mod.rarity === "Uncommon",
                "bg-amber-300": mod.rarity === "Rare",
                "bg-zinc-200": mod.rarity === "Legendary",
                "bg-orange-200": mod.rawName.startsWith("Archon"),
                "bg-slate-400": mod.rawName.startsWith("Galvanized"),
              })}
            >
              {mod.rarity}
            </Badge>
          </div>
          {showDrops && mod.drops && mod.drops.length > 0 && (
            <div>
              <h3 className="mb-2 font-semibold">Drops:</h3>
              <ul className="list-inside list-disc">
                {mod.drops.map((drop, index) => (
                  <li key={index}>{drop.location}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>
      {!hideAction && (
        <div className="flex flex-col justify-center space-y-2 border-l p-4">
          <Button
            variant={isOwned ? "default" : "outline"}
            size="icon"
            onClick={() => toggleOwnList()}
            aria-label={isOwned ? "Mark as not owned" : "Mark as owned"}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={isWishlisted ? "default" : "outline"}
            size="icon"
            onClick={() => toggleWishlist()}
            aria-label={isWishlisted ? "Unpin" : "Pin"}
          >
            <PinIcon className="h-4 w-4" />
          </Button>
          {mod.wikiaUrl && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(mod.wikiaUrl, "_blank")}
              aria-label="Open Wiki page"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
          )}
          {mod.tradable && (
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                window.open(
                  `https://warframe.market/items/${_.snakeCase(mod.rawName)}`,
                  "_blank",
                )
              }
              aria-label="Open Warframe.market"
            >
              <Store className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </Card>
  )
}
