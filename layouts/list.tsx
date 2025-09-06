"use client"

import { ModCard } from "@/components/modCard"
import { modSortingScore } from "@/lib/utils"
import { modOwnlistAtom, modWishlistAtom } from "@/store/atoms"
import { ModData } from "@/types"
import { useAtomValue } from "jotai"
import _ from "lodash"
import { useEffect, useMemo, useState } from "react"

type ListProps = {
  mode: "owned" | "wishlisted"
  allMods: {
    [key: string]: ModData[]
  }
}

export const List = ({ mode, allMods }: ListProps) => {
  const [isMounted, setIsMounted] = useState(false)

  const modsWishlisted = useAtomValue(modWishlistAtom)
  const modsOwned = useAtomValue(modOwnlistAtom)

  const modsToShowed = useMemo(() => {
    if (!allMods || !isMounted) return []

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
  }, [allMods, mode, JSON.stringify(modsOwned), JSON.stringify(modsWishlisted)])

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
