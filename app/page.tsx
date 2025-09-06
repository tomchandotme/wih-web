import { ModCard } from "@/components/modCard"
import { getMods } from "@/items/mods"
import { Fragment } from "react"

export default function Home() {
  const mods = getMods()

  const category = Object.keys(mods)

  return (
    <>
      {category.map((c) => {
        const modsCat = mods[c]

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
      })}
    </>
  )
}
