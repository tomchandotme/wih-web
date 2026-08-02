"use client"

import { ModCard } from "@/components/modCard"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  const filtersActive = Boolean(query || unownedOnly)

  return (
    <>
      <h1 className="sr-only">Warframe Mods</h1>
      <div className="border-border/80 bg-card/60 mb-8 flex flex-col gap-3 rounded-md border px-3 py-3 sm:flex-row sm:items-center">
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mods…"
          aria-label="Search mods"
          className="border-border/80 bg-background sm:max-w-sm"
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="unowned-only"
              checked={unownedOnly}
              onCheckedChange={(checked) => setUnownedOnly(checked === true)}
            />
            <Label
              htmlFor="unowned-only"
              className="cursor-pointer text-sm leading-none font-normal"
            >
              Unowned only
            </Label>
          </div>
          {filtersActive && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground h-auto px-0 py-0 text-sm leading-none font-normal hover:bg-transparent"
              onClick={() => {
                setQuery("")
                setUnownedOnly(false)
              }}
            >
              Clear
            </Button>
          )}
        </div>
        {filtersActive && totalShown > 0 && (
          <p className="text-muted-foreground font-mono text-xs sm:ml-auto">
            {totalShown} mods
          </p>
        )}
      </div>

      {totalShown === 0 ? (
        <p className="text-muted-foreground text-sm">
          No mods match your filters.
        </p>
      ) : (
        filteredCategories.map((c, categoryIndex) => {
          const modsCat = filtered[c]

          return (
            <Fragment key={`section_${c}`}>
              <h2
                className="mb-5 flex items-center gap-3 text-xl font-semibold tracking-tight"
                id={c}
              >
                <span
                  className="bg-brand h-5 w-1 shrink-0 rounded-full"
                  aria-hidden
                />
                {c}
              </h2>

              <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {modsCat.map((m, index) => (
                  <ModCard
                    key={`${c}_mod_card_${m.rawName}`}
                    mod={m}
                    priority={categoryIndex === 0 && index < 3}
                  />
                ))}
              </div>
            </Fragment>
          )
        })
      )}
    </>
  )
}
