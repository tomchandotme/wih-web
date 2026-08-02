import { HomeMods } from "@/components/homeMods"
import { getMods } from "@/items/mods"

export default function Home() {
  const mods = getMods()

  return <HomeMods mods={mods} />
}
