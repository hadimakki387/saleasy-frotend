import { ProductInterface } from "@/fake-db/products-2";
import { createSlice } from "@reduxjs/toolkit";

interface CartItemsInterface extends ProductInterface {
  quantity: number;
}
const initialState: {
  CartItems: CartItemsInterface[];
} = {
  CartItems: [],
};

const ItemSlice = createSlice({
  name: "ItemSlice",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.CartItems = action.payload;
    },
  },
});

export const { setCartItems } = ItemSlice.actions;

export default ItemSlice.reducer;
