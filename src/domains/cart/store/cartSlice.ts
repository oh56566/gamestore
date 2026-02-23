import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Game } from "../../catalog/model/game";
import { type CartItem, type CartArray } from "../model/cart";

const cart2 = createSlice({
  name: "cart",
  initialState: {
    cart1: [
      // 초기 장바구니 데이터는 비워둠
    ],
  } as CartArray,

  reducers: {
    // addItem 리듀서 (DetailPage에서 사용)
    addItem: (state, action: PayloadAction<Game>) => {
      const newGame = action.payload;
      const existingItem = state.cart1.find((item) => item.id === newGame.id);

      // 최종 가격 계산
      const finalPrice =
        newGame.isOnSale && newGame.discountedPrice !== undefined
          ? newGame.discountedPrice
          : newGame.price;

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart1.push({
          id: newGame.id,
          name: newGame.name,
          quantity: 1,
          price: finalPrice,
          description: newGame.description || "",
          isOnSale: newGame.isOnSale || false,
          star: newGame.star || "",
        });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart1.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart1.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cart1 = state.cart1.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem } =
  cart2.actions;
export type { CartItem };
export default cart2;
