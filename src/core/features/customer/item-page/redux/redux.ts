import { ProductInterface } from "@/fake-db/products-2";
import { createSlice } from "@reduxjs/toolkit";
import { ItemInterface } from "../../landing/interfaces/items-interface";

interface CartItemsInterface extends ItemInterface {
  quantity: number;
  selectedOptions: {
    key: string;
    value: string;
  }[];
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
