import { describe, expect, test } from "bun:test"
import {
  matchesModQuery,
  modSortingScore,
  replacePlaceholdersWithEmojis,
} from "./utils"
import type { ModData } from "../types"

const baseMod = (overrides: Partial<ModData> = {}): ModData => ({
  name: "Serration",
  description: "+165% Damage",
  imageUrl: "https://example.com/x.png",
  rawName: "Serration",
  type: "Primary Mod",
  uniqueName: "/Lotus/Upgrades/Mods/Rifle/WeaponDamageAmountMod",
  tradable: true,
  rarity: "Uncommon",
  ...overrides,
})

describe("modSortingScore", () => {
  test("ranks Galvanized above Archon above Legendary", () => {
    const galvanized = modSortingScore(
      baseMod({ rawName: "Galvanized Scope", rarity: "Rare" }),
    )
    const archon = modSortingScore(
      baseMod({ rawName: "Archon Continuity", rarity: "Rare" }),
    )
    const legendary = modSortingScore(baseMod({ rarity: "Legendary" }))
    const common = modSortingScore(baseMod({ rarity: "Common" }))

    expect(galvanized).toBeGreaterThan(archon)
    expect(archon).toBeGreaterThan(legendary)
    expect(legendary).toBeGreaterThan(common)
  })

  test("adds type score for Primary Mod", () => {
    const primary = modSortingScore(
      baseMod({ type: "Primary Mod", rarity: "Common" }),
    )
    const melee = modSortingScore(
      baseMod({ type: "Melee Mod", rarity: "Common" }),
    )
    expect(primary).toBeGreaterThan(melee)
  })
})

describe("replacePlaceholdersWithEmojis", () => {
  test("replaces damage type tags", () => {
    expect(replacePlaceholdersWithEmojis("<DT_FIRE> Damage")).toBe("🔥 Damage")
    expect(replacePlaceholdersWithEmojis("<DT_SLASH> and <DT_VIRAL>")).toBe(
      "🗡️ and 🦠",
    )
  })

  test("leaves unknown tags intact", () => {
    expect(replacePlaceholdersWithEmojis("<DT_UNKNOWN_TAG>")).toBe(
      "<DT_UNKNOWN_TAG>",
    )
  })
})

describe("matchesModQuery", () => {
  const mod = baseMod({
    name: "致命一击 (Serration)",
    rawName: "Serration",
    compatName: "RIFLE",
    description: "+165% Damage",
  })

  test("empty query matches all", () => {
    expect(matchesModQuery(mod, "")).toBe(true)
  })

  test("matches name, rawName, description, compatName", () => {
    expect(matchesModQuery(mod, "serration")).toBe(true)
    expect(matchesModQuery(mod, "致命")).toBe(true)
    expect(matchesModQuery(mod, "165%")).toBe(true)
    expect(matchesModQuery(mod, "rifle")).toBe(true)
    expect(matchesModQuery(mod, "xyzzy")).toBe(false)
  })

  test("tolerates non-string description from data quirks", () => {
    const quirky = baseMod({
      description: ["+60% ", "Heat"] as unknown as string,
    })
    expect(matchesModQuery(quirky, "heat")).toBe(true)
    expect(matchesModQuery(quirky, "slash")).toBe(false)
  })
})
