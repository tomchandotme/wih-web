import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const modSortingScore = (m: ModData) => {
  let init = 0

  if (m.rarity === "Common") {
    init += 0
  }
  if (m.rarity === "Uncommon") {
    init += 1
  }
  if (m.rarity === "Rare") {
    init += 2
  }
  if (m.rarity === "Legendary") {
    init += 3
  }
  if (m.rawName.startsWith("Archon")) {
    init += 4
  }
  if (m.rawName.startsWith("Galvanized")) {
    init += 5
  }

  if (m.type === "Primary Mod") {
    init += 0.4
  }
  if (m.type === "Warframe Mod") {
    init += 0.5
  }
  if (m.type === "Shotgun Mod") {
    init += 0.3
  }
  if (m.type === "Secondary Mod") {
    init += 0.2
  }
  if (m.type === "Melee Mod") {
    init += 0.1
  }

  return init
}
