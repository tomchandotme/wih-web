import { getMods } from "@/items/mods"
import { List } from "@/layouts/list"

export default function ListPage() {
  const allMods = getMods()

  return <List mode={"wishlisted"} allMods={allMods} />
}
