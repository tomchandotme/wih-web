import _ from "lodash"
import Items from "warframe-items"
import type { Drop, ItemI18n, Mod } from "warframe-items"

type ModData = {
  name: string
  description: string
  imageUrl: string
  rawName: string
  type: string
  compatName?: string
  rarity?: string
  drops?: Drop[]
  wikiaThumbnail?: string
  wikiaUrl?: string
  uniqueName: string
}

const modDataExtractor = (v: Mod): ModData => {
  // @ts-expect-error
  const i18n = v["i18n"]["tc"] as unknown as ItemI18n

  const name =
    i18n.name && i18n.name !== v.name ? `${i18n.name} (${v.name})` : v.name

  const lastStats =
    !i18n.levelStats || !i18n.levelStats.length
      ? []
      : i18n.levelStats[i18n.levelStats.length - 1].stats

  const description = lastStats.join(" ")

  const imageUrl = `https://cdn.warframestat.us/img/${v.imageName}`

  const { type, compatName, rarity, wikiaThumbnail, wikiaUrl, uniqueName } = v

  const drops = v.drops?.filter((d) => d.type === v.name)

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
  }
}

const modTypes = [
  "Primary Mod",
  "Warframe Mod",
  "Shotgun Mod",
  "Secondary Mod",
  "Melee Mod",
]

const modSets = [
  {
    name: "Orokin Vault Mods",
    modFilter: (v: Mod) =>
      v.drops?.some(
        (d) => d.location === "Derelict Vault" && d.type === v.name
      ),
  },
  {
    name: "Nightmare Mods",
    modFilter: (v: Mod) =>
      v.drops?.some(
        (d) =>
          d.location.startsWith("Nightmare Mode Rewards") && d.type === v.name
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
    name: "Mods from Caches",
    modFilter: (v: Mod) => {
      const cachesSuffixes = [
        "(Caches), Rotation A",
        "(Caches), Rotation B",
        "(Caches), Rotation C",
      ]

      return v.drops?.some(
        (d) =>
          cachesSuffixes.some((s) => d.location.endsWith(s)) &&
          d.type === v.name
      )
    },
  },
]

export const getMods = () => {
  const items = new Items({
    category: ["Mods"],
    i18n: ["tc"],
    i18nOnObject: true,
  }) as Mod[]

  const res: { [key: string]: ModData[] } = {}

  modSets.forEach(({ name, modFilter }) => {
    const mods = items
      .filter(modFilter)
      .filter((m) => modTypes.includes(m.type))
      .map(modDataExtractor)

    res[name] = _.sortBy(mods, (v) => v.compatName)
  })

  return res
}
