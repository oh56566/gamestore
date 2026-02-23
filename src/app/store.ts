import { configureStore } from "@reduxjs/toolkit";
import cart2 from "../domains/cart/store/cartSlice";
import library from "../domains/library/store/librarySlice";

const store = configureStore({
  reducer: {
    cart3: cart2.reducer,
    library: library.reducer,
  },
});

//  RootState 및 AppDispatch 타입 정의 (useSelector/useDispatch 사용을 위함)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 각 슬라이스 액션 및 타입 재수출
export { addItem, increaseQuantity, decreaseQuantity, removeItem } from "../domains/cart/store/cartSlice";
export { addGameToLibrary, setSelectedLibraryItem, removeGameFromLibrary } from "../domains/library/store/librarySlice";
export type { CartItem } from "../domains/cart/model/cart";
export type { LibraryItem } from "../domains/library/model/library";

export default store;
