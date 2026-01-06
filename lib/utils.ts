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
