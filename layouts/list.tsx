"use client"

import { ModCard } from "@/components/modCard"
import { modSortingScore } from "@/lib/utils"
import { modOwnlistAtom, modWishlistAtom } from "@/store/atoms"
import { useAtomValue } from "jotai"
import _ from "lodash"
import { useMemo } from "react"
import useSWR from "swr"

type ListProps = {
  mode: "owned" | "wishlisted"
}

export const List = ({ mode }: ListProps) => {
  const modsWishlisted = useAtomValue(modWishlistAtom)
  const modsOwned = useAtomValue(modOwnlistAtom)

  const { data: allMods, isLoading } = useSWR<{ [key: string]: ModData[] }>(
    "/api/mods",
    (url: string) => fetch(url).then((r) => r.json()),
  )

  const modsToShowed = useMemo(() => {
    if (!allMods) return []

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

  if (isLoading) {
    return null
  }

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
