import type { Drop } from "@wfcd/items"

export type ModData = {
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
  tradable: boolean
}
