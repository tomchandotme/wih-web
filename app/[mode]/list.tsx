"use client"

import { ModCard } from "@/components/modCard"
import { type ModData } from "@/items/mods"
import { modSortingScore } from "@/lib/utils"
import { modOwnlistAtom, modWishlistAtom } from "@/store/atoms"
import { useAtomValue } from "jotai"
import _ from "lodash"
import { useMemo } from "react"

type ListProps = {
  mode: "owned" | "wishlisted"
  allMods: { [key: string]: ModData[] }
}

export const List = ({ mode, allMods }: ListProps) => {
  const modsWishlisted = useAtomValue(modWishlistAtom)
  const modsOwned = useAtomValue(modOwnlistAtom)

  const modsToShowed = useMemo(() => {
    return _.uniqBy(
      Object.values(allMods).flatMap((v) => v),
      (v) => v.uniqueName,
    )
      .filter((v) =>
        mode === "owned"
          ? modsOwned.includes(v.rawName)
          : modsWishlisted.includes(v.rawName),
      )
      .sort((a, b) => modSortingScore(b) - modSortingScore(a))
  }, [allMods, mode, modsOwned, modsWishlisted])

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        {mode === "owned" ? "Owned Mods" : "Wishlisted Mods"}
      </h1>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modsToShowed.map((m) => (
          <ModCard key={`mod_card_${m.rawName}`} mod={m} hideAction showDrops />
        ))}
      </div>
    </div>
  )
}
