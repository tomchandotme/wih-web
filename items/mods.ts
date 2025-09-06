import { modSortingScore, replacePlaceholdersWithEmojis } from "@/lib/utils"
import _ from "lodash"
import Items from "@wfcd/items"
import type { ItemI18n, Mod } from "@wfcd/items"
import { ModData } from "@/types"

const items = new Items({
  category: ["Mods"],
  i18n: ["tc"],
  i18nOnObject: true,
}) as Mod[]

const modDataExtractor = (v: Mod): ModData => {
  // @ts-expect-error
  const i18n = v["i18n"]["tc"] as unknown as ItemI18n

  const name =
    i18n.name && i18n.name !== v.name ? `${i18n.name} (${v.name})` : v.name

  const lastStats =
    !i18n.levelStats || !i18n.levelStats.length
      ? []
      : i18n.levelStats[i18n.levelStats.length - 1].stats

  const description =
    replacePlaceholdersWithEmojis(lastStats.join(" "))
      .trim()
      .replace("\\n", "\n") || i18n.description

  const imageUrl = `https://cdn.warframestat.us/img/${v.imageName}`

  const {
    type,
    compatName,
    rarity,
    wikiaThumbnail,
    wikiaUrl,
    uniqueName,
    tradable,
  } = v

  const drops = v.drops
    ?.filter((d) => d.type === v.name)
    .sort((a, b) => (b.chance || 0) - (a.chance || 0))

  const rawName = v.name

  return {
    name,
    description,
    imageUrl,
    rawName,

    type,
    compatName,
    rarity,
    drops,
    wikiaThumbnail,
    wikiaUrl,
    uniqueName,
    tradable,
  }
}

const excludedSuffixes = [
  "Beginner",
  "Intermediate",
  "Expert",
  "SubMod",
  "AvatarSentientArmourMod",
  "OnHeavyKillMod",
]

const modTypes = [
  "Primary Mod",
  "Warframe Mod",
  "Shotgun Mod",
  "Secondary Mod",
  "Melee Mod",
  "Stance Mod",
]

export const modSets = [
  {
    name: "Orokin Vault Mods",
    modFilter: (v: Mod) =>
      v.drops?.some(
        (d) => d.location === "Derelict Vault" && d.type === v.name,
      ),
  },
  {
    name: "Nightmare Mods",
    modFilter: (v: Mod) =>
      v.drops?.some(
        (d) =>
          d.location.startsWith("Nightmare Mode Rewards") && d.type === v.name,
      ),
  },
  {
    name: "60/60 Mods",
    modFilter: (v: Mod) => {
      const lastStats =
        !v.levelStats || !v.levelStats.length
          ? []
          : v.levelStats[v.levelStats.length - 1].stats
      return (
        lastStats.every((s) => s.startsWith("+60% ")) && lastStats.length === 2
      )
    },
  },
  { name: "Prime Mods", modFilter: (v: Mod) => v.isPrime },
  {
    name: "Aura Mods",
    modFilter: (v: Mod) => v.compatName === "AURA" && v.type === "Warframe Mod",
  },
  // {
  //   name: "Stance Mods",
  //   modFilter: (v: Mod) => v.type === "Stance Mod",
  // },
  {
    name: "Drift Mods",
    modFilter: (v: Mod) =>
      v.uniqueName.startsWith("/Lotus/Upgrades/Mods/OrokinChallenge"),
  },
  {
    name: "Galvanized Mods",
    modFilter: (v: Mod) => v.name.startsWith("Galvanized "),
  },
  {
    name: "Archon Mods",
    modFilter: (v: Mod) => v.name.startsWith("Archon "),
  },
  {
    name: "Arbitration Mods",
    modFilter: (v: Mod) =>
      v.drops?.some(
        (d) => d.location.startsWith("Arbitrations") && d.type === v.name,
      ),
  },
  {
    name: "Mods from Caches",
    modFilter: (v: Mod) => {
      return v.drops?.some(
        (d) => d.location.includes("Caches") && d.type === v.name,
      )
    },
  },
  {
    name: "Mods from Bounties",
    modFilter: (v: Mod) => {
      return v.drops?.some(
        (d) => d.location.includes("Bounty") && d.type === v.name,
      )
    },
  },
  {
    name: "Arbitrations Mods",
    modFilter: (v: Mod) =>
      v.drops?.some(
        (d) => d.location.startsWith("Arbitrations") && d.type === v.name,
      ),
  },
]

export const getMods = () => {
  const res: { [key: string]: ModData[] } = {}

  modSets.forEach(({ name, modFilter }) => {
    const rawMods = items
      .filter(modFilter)
      .filter((m) => modTypes.includes(m.type))

    const dupes: { [key: string]: Mod[] } = {}

    const excludes: string[] = []

    for (const mod of rawMods) {
      dupes[mod.name] = [...(dupes[mod.name] || []), mod]
    }

    Object.entries(dupes).forEach(([_name, mods]) => {
      if (mods.length > 1) {
        mods.forEach((mod) => {
          if (
            excludedSuffixes.some((suffix) => mod.uniqueName.endsWith(suffix))
          ) {
            excludes.push(mod.uniqueName)
          }
        })
      }
    })

    const mods = rawMods
      .filter((v) => !excludes.includes(v.uniqueName))
      .map(modDataExtractor)
      .sort((a, b) => modSortingScore(b) - modSortingScore(a))

    res[name] = mods
  })

  return res
}
