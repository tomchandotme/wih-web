import { ModData } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DAMAGE_TYPE_EMOJI_MAP, RARITY_SCORES, TYPE_SCORES } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const modSortingScore = (m: ModData) => {
  let score = 0

  if (m.rarity && m.rarity in RARITY_SCORES) {
    score += RARITY_SCORES[m.rarity]
  }

  if (m.rawName.startsWith("Archon")) {
    score += 4
  } else if (m.rawName.startsWith("Galvanized")) {
    score += 5
  }

  if (m.type && m.type in TYPE_SCORES) {
    score += TYPE_SCORES[m.type]
  }

  return score
}

export const replacePlaceholdersWithEmojis = (text: string): string => {
  const placeholderRegex = /<DT_[A-Z_]+>|<LOWER_IS_BETTER>/g

  return text.replace(placeholderRegex, (matchedTag) => {
    return DAMAGE_TYPE_EMOJI_MAP.get(matchedTag) || matchedTag
  })
}

const asSearchText = (value: unknown) => {
  if (typeof value === "string") return value
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string").join(" ")
  return ""
}

export const matchesModQuery = (mod: ModData, query: string) => {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    asSearchText(mod.name).toLowerCase().includes(q) ||
    asSearchText(mod.rawName).toLowerCase().includes(q) ||
    asSearchText(mod.description).toLowerCase().includes(q) ||
    asSearchText(mod.compatName).toLowerCase().includes(q)
  )
}
