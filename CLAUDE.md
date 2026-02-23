# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (Vite, http://localhost:5173)
npm run build      # Type-check (tsc -b) then bundle (vite build)
npm run lint       # Run ESLint across the project
npm run preview    # Preview production build locally
```

> Note: The README mentions `npm start` / port 3000, but this project uses Vite — the correct dev command is `npm run dev` on port 5173.

## Architecture

### Routing & Layout
- `src/main.tsx` wraps the app in `<StrictMode>`, `<BrowserRouter>`, and Redux `<Provider>`.
- `src/App.tsx` composes `<Content />` + `<Footer />`.
- All route definitions and the top navbar live in `src/layout/Content.tsx`.

### State Management (`src/data/store.tsx`)
Two Redux Toolkit slices:
- **`cart3`** (`cart2` reducer): cart items (`CartItem = Game & { quantity }`)
  - Actions: `addItem`, `increaseQuantity`, `decreaseQuantity`, `removeItem`
- **`library`**: purchased games (`LibraryItem = Game without category, plus purchaseDate & price`) and `selectedItemId` for the two-pane library view
  - Actions: `addGameToLibrary`, `removeGameFromLibrary`, `setSelectedLibraryItem`

Checkout (`CartPage`) calls `addGameToLibrary(cartItems)` which moves items from cart to library with a `purchaseDate` timestamp, then clears the cart.

### Data (`src/data/games.ts`)
Static array of `Game` objects (7 games). The `Game` type is the canonical product model used throughout the app. Games have optional `discountedPrice` when `isOnSale: true`. Prices are in Korean Won (₩).

### Pages → Key Logic
| Page | Notable logic |
|---|---|
| `HomePage` | `useMemo` for recommendation algorithm: sorts by star rating when library is empty; otherwise filters by category overlap with owned games |
| `ListPage` | Real-time search + category filter; categories are derived dynamically from the games array |
| `DetailPage` | Tracks views in localStorage via `src/utils/recentViewed.ts`; conditionally renders "In Library" vs "Add to Cart" button by checking Redux library state |
| `CartPage` | Checkout dispatches `addGameToLibrary` then clears cart; uses SweetAlert2 for confirmation |
| `LibraryPage` | Two-column layout driven by `selectedItemId` in Redux; receives pre-selected game via React Router `state` from DetailPage |

### Styling
- Design tokens (CSS variables) are defined in `src/index.css`: `--bg-0/1/2`, `--text-0/1/2`, `--accent`, `--border-1/2`, `--r-1/2/3`.
- Component-level styles and animations are in `src/App.css`.
- UI uses glass-morphism (`backdrop-filter: blur`) on the navbar and panels.

## Conventions (from .cursorrules)
- Comments should be short and to the point — core concepts only.
