import { atomWithStorage } from "jotai/utils"
import { useAtom } from "jotai"
import _ from "lodash"

export const modWishlistAtom = atomWithStorage<string[]>("modWishlist", [])
export const modOwnlistAtom = atomWithStorage<string[]>("modOwnlist", [])

export const useModWishlist = (rawName: string) => {
  const [modWishlist, setModWishlist] = useAtom(modWishlistAtom)

  return {
    isWishlisted: modWishlist.includes(rawName),
    toggleWishlist: () => setModWishlist((v) => _.xor(v, [rawName])),
  }
}

export const useModOwnlist = (rawName: string) => {
  const [modOwnList, setModOwnList] = useAtom(modOwnlistAtom)

  return {
    isOwned: modOwnList.includes(rawName),
    toggleOwnList: () => setModOwnList((v) => _.xor(v, [rawName])),
  }
}
