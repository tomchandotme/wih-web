import { ModCard } from "@/components/modCard"
import { getMods } from "@/items/mods"
import { Fragment } from "react"

export default function Home() {
  const mods = getMods()

  const category = Object.keys(mods)

  return (
    <div className="mx-auto w-max space-y-4 py-4">
      {category.map((c) => {
        const modsCat = mods[c]

        return (
          <Fragment key={`section_${c}`}>
            <h1>{c}</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
              {modsCat.map((m) => (
                <ModCard key={`mod_card_${m.rawName}`} mod={m} />
              ))}
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
