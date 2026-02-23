import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CartItem } from "../../cart/model/cart";
import { type LibraryItem, type LibraryState } from "../model/library";

const library = createSlice({
  name: "library",
  initialState: {
    items: [] as LibraryItem[],
    selectedItemId: null,
  } as LibraryState,

  reducers: {
    addGameToLibrary: (state, action: PayloadAction<CartItem[]>) => {
      const purchasedItems = action.payload;
      const now = new Date().toISOString().split("T")[0];

      purchasedItems.forEach((item: CartItem) => {
        const existingGame = state.items.find((g) => g.id === item.id);

        if (!existingGame) {
          const libraryItem: LibraryItem = {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            isOnSale: item.isOnSale,
            star: item.star,
            purchaseDate: now,
          };
          if (item.discountedPrice !== undefined) {
            libraryItem.discountedPrice = item.discountedPrice;
          }
          state.items.push(libraryItem);
        }
      });
    },
    removeGameFromLibrary: (state, action: PayloadAction<number>) => {
      if (state.selectedItemId === action.payload) {
        state.selectedItemId = null;
      }
      state.items = state.items.filter((itme) => itme.id !== action.payload);
    },
    setSelectedLibraryItem: (state, action: PayloadAction<number | null>) => {
      state.selectedItemId = action.payload;
    },
  },
});

export const {
  addGameToLibrary,
  setSelectedLibraryItem,
  removeGameFromLibrary,
} = library.actions;
export type { LibraryItem };
export default library;
