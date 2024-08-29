import { atomWithStorage } from "jotai/utils"

export const modWishlistAtom = atomWithStorage<string[]>("modWishlist", [])
