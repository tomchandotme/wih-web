"use client"

import { ModCard } from "@/components/modCard"
import { Button } from "@/components/ui/button"
import { matchesModQuery } from "@/lib/utils"
import { modOwnlistAtom } from "@/store/atoms"
import { ModData } from "@/types"
import { useAtomValue } from "jotai"
import { Fragment, useDeferredValue, useMemo, useState } from "react"

type HomeModsProps = {
  mods: {
    [key: string]: ModData[]
  }
}

export const HomeMods = ({ mods }: HomeModsProps) => {
  const [query, setQuery] = useState("")
  const [unownedOnly, setUnownedOnly] = useState(false)
  const deferredQuery = useDeferredValue(query)
  const modsOwned = useAtomValue(modOwnlistAtom)

  const categories = useMemo(() => Object.keys(mods), [mods])

  const filtered = useMemo(() => {
    const result: { [key: string]: ModData[] } = {}

    for (const category of categories) {
      const list = mods[category].filter((mod) => {
        if (unownedOnly && modsOwned.includes(mod.rawName)) return false
        return matchesModQuery(mod, deferredQuery)
      })
      if (list.length > 0) result[category] = list
    }

    return result
  }, [categories, deferredQuery, mods, modsOwned, unownedOnly])

  const filteredCategories = Object.keys(filtered)
  const totalShown = filteredCategories.reduce(
    (sum, c) => sum + filtered[c].length,
    0,
  )

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mods…"
          aria-label="Search mods"
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden sm:max-w-sm"
        />
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={unownedOnly}
            onChange={(e) => setUnownedOnly(e.target.checked)}
            className="size-4"
          />
          Unowned only
        </label>
        {(query || unownedOnly) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("")
              setUnownedOnly(false)
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {totalShown === 0 ? (
        <p className="text-muted-foreground text-sm">No mods match your filters.</p>
      ) : (
        filteredCategories.map((c) => {
          const modsCat = filtered[c]

          return (
            <Fragment key={`section_${c}`}>
              <h1 className="mb-6 text-2xl font-bold" id={c}>
                {c}
              </h1>

              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {modsCat.map((m) => (
                  <ModCard key={`${c}_mod_card_${m.rawName}`} mod={m} />
                ))}
              </div>
            </Fragment>
          )
        })
      )}
    </>
  )
}
