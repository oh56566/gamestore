import { type Game } from "../../catalog/model/game";

export interface CartItem extends Game {
  quantity: number; // 장바구니에 담긴 수량
}

export interface CartArray {
  cart1: CartItem[];
}
