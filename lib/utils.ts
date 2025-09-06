import { ModData } from "@/types"
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

const damageTypeEmojiMap = new Map<string, string>([
  // --- Physical Damage Types ---
  // Impact (represented by a hammer/pickaxe)
  ["<DT_IMPACT>", "⚒️"],
  ["<DT_IMPACT_OUTLINE>", "⚒️"],
  ["<DT_IMPACT_COLOR>", "⚒️"],
  ["<DT_IMPACT_COLOR_NO_ADV>", "⚒️"],

  // Puncture (represented by a pushpin/nail)
  ["<DT_PUNCTURE>", "📌"],
  ["<DT_PUNCTURE_OUTLINE>", "📌"],
  ["<DT_PUNCTURE_COLOR>", "📌"],
  ["<DT_PUNCTURE_COLOR_NO_ADV>", "📌"],

  // Slash (represented by a curved blade/dagger)
  ["<DT_SLASH>", "🗡️"],
  ["<DT_SLASH_OUTLINE>", "🗡️"],
  ["<DT_SLASH_COLOR>", "🗡️"],
  ["<DT_SLASH_COLOR_NO_ADV>", "🗡️"],

  // --- Elemental Damage Types ---
  // Fire
  ["<DT_FIRE>", "🔥"],
  ["<DT_FIRE_OUTLINE>", "🔥"],
  ["<DT_FIRE_COLOR>", "🔥"],
  ["<DT_FIRE_COLOR_NO_ADV>", "🔥"],

  // Freeze (Cold)
  ["<DT_FREEZE>", "❄️"],
  ["<DT_FREEZE_OUTLINE>", "❄️"],
  ["<DT_FREEZE_COLOR>", "❄️"],
  ["<DT_FREEZE_COLOR_NO_ADV>", "❄️"],

  // Electricity
  ["<DT_ELECTRICITY>", "⚡️"],
  ["<DT_ELECTRICITY_OUTLINE>", "⚡️"],
  ["<DT_ELECTRICITY_COLOR>", "⚡️"],
  ["<DT_ELECTRICITY_COLOR_NO_ADV>", "⚡️"],

  // Poison (Toxin)
  ["<DT_POISON>", "☠️"], // Skull and crossbones
  ["<DT_POISON_OUTLINE>", "☠️"],
  ["<DT_POISON_COLOR>", "☠️"],
  ["<DT_POISON_COLOR_NO_ADV>", "☠️"],

  // --- Area/Effect Damage Types ---
  // Explosion (Starburst/Collision)
  ["<DT_EXPLOSION>", "💥"],
  ["<DT_EXPLOSION_OUTLINE>", "💥"],
  ["<DT_EXPLOSION_COLOR>", "💥"],
  ["<DT_EXPLOSION_COLOR_NO_ADV>", "💥"],

  // Radiation
  ["<DT_RADIATION>", "☢️"],
  ["<DT_RADIATION_OUTLINE>", "☢️"],
  ["<DT_RADIATION_COLOR>", "☢️"],
  ["<DT_RADIATION_COLOR_NO_ADV>", "☢️"],

  // Gas (represented by a gas mask; using cloud as no direct emoji)
  ["<DT_GAS>", "☁️"],
  ["<DT_GAS_OUTLINE>", "☁️"],
  ["<DT_GAS_COLOR>", "☁️"],
  ["<DT_GAS_COLOR_NO_ADV>", "☁️"],

  // Magnetic
  ["<DT_MAGNETIC>", "🧲"],
  ["<DT_MAGNETIC_OUTLINE>", "🧲"],
  ["<DT_MAGNETIC_COLOR>", "🧲"],
  ["<DT_MAGNETIC_COLOR_NO_ADV>", "🧲"],

  // Viral (Microbe/Virus)
  ["<DT_VIRAL>", "🦠"],
  ["<DT_VIRAL_OUTLINE>", "🦠"],
  ["<DT_VIRAL_COLOR>", "🦠"],
  ["<DT_VIRAL_COLOR_NO_ADV>", "🦠"],

  // Corrosive (Dripping/Biohazard)
  ["<DT_CORROSIVE>", "☣️"], // Biohazard symbol
  ["<DT_CORROSIVE_OUTLINE>", "☣️"],
  ["<DT_CORROSIVE_COLOR>", "☣️"],
  ["<DT_CORROSIVE_COLOR_NO_ADV>", "☣️"],

  // Radiant (Spirit/Light)
  ["<DT_RADIANT>", "✨"], // Sparkles or glint
  ["<DT_RADIANT_OUTLINE>", "✨"],
  ["<DT_RADIANT_COLOR>", "✨"],
  ["<DT_RADIANT_COLOR_NO_ADV>", "✨"],

  // Sentient (Eye/Psionic)
  ["<DT_SENTIENT>", "👁️"], // Eye
  ["<DT_SENTIENT_OUTLINE>", "👁️"],
  ["<DT_SENTIENT_COLOR>", "👁️"],

  // --- Special Types ---
  // Finisher (Crossed Swords)
  ["<DT_FINISHER>", "⚔️"],

  // --- "Space" Variants (often different or context-specific icons) ---
  // Ballistic (Impact-like space)
  ["<DT_IMPACT_SPACE>", "⚒️"], // Icon is similar to Impact

  // Plasma (Puncture-like space, icon is a thin spike)
  ["<DT_PUNCTURE_SPACE>", "📍"], // Round pushpin, distinct from regular Puncture's 📌

  // Particle (Slash-like space, icon is a knife)
  ["<DT_SLASH_SPACE>", "🔪"], // Kitchen Knife

  // Incendiary (Fire-like space)
  ["<DT_FIRE_SPACE>", "🔥"], // Icon is same as Fire

  // Frost (Freeze-like space)
  ["<DT_FREEZE_SPACE>", "❄️"], // Icon is same as Freeze

  // Ionic (Electricity-like space, icon is lightning in a circle)
  ["<DT_ELECTRICITY_SPACE>", "⚛️"], // Atom symbol for general energy/ionic

  // Chem (Poison-like space, icon is a beaker/flask)
  ["<DT_POISON_SPACE>", "🧪"], // Test Tube/Beaker

  ["<LOWER_IS_BETTER>", " "],
])

export const replacePlaceholdersWithEmojis = (text: string): string => {
  // Define the map of placeholder tags to their corresponding emojis.
  // This could also be passed as an argument or loaded from a configuration.

  // Define the regular expression to match the placeholder pattern.
  // - '<DT_': Matches the literal start sequence.
  // - '[A-Z_]+': Matches one or more uppercase letters or underscores.
  // - '>': Matches the literal end character.
  // - 'g': Global flag, ensures all occurrences are replaced, not just the first.
  const placeholderRegex = /<DT_[A-Z_]+>|<LOWER_IS_BETTER>/g

  // Use String.prototype.replace() with a replacer function.
  // The replacer function is called for each match found by the regex.
  return text.replace(placeholderRegex, (matchedTag) => {
    // Look up the matched tag in the emojiMap.
    // If the tag is found, return its corresponding emoji.
    // If the tag is not found in the map, return the original matchedTag itself.
    // This ensures that unknown tags are preserved rather than being removed or errored.
    return damageTypeEmojiMap.get(matchedTag) || matchedTag
  })
}
