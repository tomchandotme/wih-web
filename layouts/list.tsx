"use client"

import { ModCard } from "@/components/modCard"
import { modSortingScore } from "@/lib/utils"
import { modOwnlistAtom, modWishlistAtom } from "@/store/atoms"
import { ModData } from "@/types"
import { useAtomValue } from "jotai"
import uniqBy from "lodash/uniqBy"
import { useMemo, useSyncExternalStore } from "react"

type ListProps = {
  mode: "owned" | "wishlisted"
  allMods: {
    [key: string]: ModData[]
  }
}

const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export const List = ({ mode, allMods }: ListProps) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  )

  const modsWishlisted = useAtomValue(modWishlistAtom)
  const modsOwned = useAtomValue(modOwnlistAtom)

  const modsToShowed = useMemo(() => {
    if (!allMods || !isMounted) return []

    return uniqBy(
      Object.values(allMods).flatMap((v) => v),
      (v) => v.uniqueName,
    )
      .filter((v) =>
        mode === "owned"
          ? modsOwned.includes(v.rawName)
          : modsWishlisted.includes(v.rawName),
      )
      .sort((a, b) => modSortingScore(b) - modSortingScore(a))
  }, [allMods, isMounted, mode, modsOwned, modsWishlisted])

  return (
    <div>
      <h1 className="mb-6 flex items-center gap-3 text-xl font-semibold tracking-tight">
        <span className="bg-brand h-5 w-1 shrink-0 rounded-full" aria-hidden />
        {mode === "owned" ? "Owned Mods" : "Wishlisted Mods"}
      </h1>
      {modsToShowed.length === 0 ? (
        <p className="text-muted-foreground mb-8 text-sm">
          {isMounted
            ? mode === "owned"
              ? "No owned mods yet. Mark mods as owned from the home page."
              : "No wishlisted mods yet. Add mods to your wishlist from the home page."
            : "Loading…"}
        </p>
      ) : (
        <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {modsToShowed.map((m, index) => (
            <ModCard
              key={`mod_card_${m.rawName}`}
              mod={m}
              showDrops
              priority={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  )
}
