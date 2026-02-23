import { type CartItem } from "../../cart/model/cart";

export type LibraryItem = Omit<CartItem, "quantity" | "category"> & {
  purchaseDate: string;
  price: number;
};

export interface LibraryState {
  items: LibraryItem[];
  selectedItemId: number | null; // 현재 선택된 아이템 ID
}
