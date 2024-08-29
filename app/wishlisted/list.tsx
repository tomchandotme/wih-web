"use client"

import { ModData } from "@/items/mods"
import { Fragment } from "react"
import { ModCard } from "@/components/modCard"
import { useAtomValue } from "jotai"
import { modWishlistAtom } from "@/store/modWishlist"

export const List = ({
  mods,
}: {
  mods: {
    [key: string]: ModData[]
  }
}) => {
  const wishlisted = useAtomValue(modWishlistAtom)

  const category = Object.keys(mods)

  return (
    <>
      {category.map((c) => {
        const modsCat = mods[c].filter((m) => wishlisted.includes(m.rawName))

        return (
          <Fragment key={`section_${c}`}>
            <h1>{c}</h1>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {modsCat.map((m) => (
                <div
                  className="flex min-w-40 gap-2"
                  key={`mod_card_${m.rawName}`}
                >
                  <ModCard mod={m} hideWishlist />
                  <div className="flex flex-1 flex-col gap-2 p-4 text-xs">
                    {m.drops?.map((d, i) => (
                      <div key={`${m.rawName}_drop_${i}`}>{d.location}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        )
      })}
    </>
  )
}
