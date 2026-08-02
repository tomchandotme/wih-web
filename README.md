# wih-web (Warframe Item Helper)

A small utility site for [Warframe](https://www.warframe.com/) — browse curated mod sets, mark what you own or want, and jump to wiki / [warframe.market](https://warframe.market) listings.

## Features

- Curated mod categories (Orokin Vault, Nightmare, Galvanized, Archon, etc.)
- Owned / wishlisted lists stored in the browser (`localStorage` keys: `modOwnlist`, `modWishlist`)
- Search and “unowned only” filter on the home page
- Drop locations, rarity, and external links

## Data

Mod data comes from [`@wfcd/items`](https://www.npmjs.com/package/@wfcd/items). Images load from `cdn.warframestat.us`.

## Develop

```bash
bun install
bun run dev    # http://localhost:9528
bun run lint
bun run test
bun run build
```
