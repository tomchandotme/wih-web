import { useAtom } from "jotai"
import { modWishlistAtom } from "./modWishlist"
import _ from "lodash"

export const useModWishlist = (rawName: string) => {
  const [modWishlist, setModWishlist] = useAtom(modWishlistAtom)

  return {
    isWishlisted: modWishlist.includes(rawName),
    toggleWishlist: () => setModWishlist((v) => _.xor(v, [rawName])),
  }
}
