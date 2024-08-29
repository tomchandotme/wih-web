import { getMods } from "@/items/mods"
import { List } from "./list"

export default function Wishlisted() {
  const mods = getMods()

  return (
    <div className="mx-auto w-max space-y-4 py-4">
      <List mods={mods} />
    </div>
  )
}
