import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existing = state.cart.find((it) => it.pizzaId === item.pizzaId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.totalPrice = existing.quantity * existing.unitPrice;
      } else {
        state.cart.push({
          pizzaId: item.pizzaId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        });
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    deleteItem(state, action) {
      const id = action.payload;
      state.cart = state.cart.filter((it) => it.pizzaId !== id);
    },
    increaseItemQuantity(state, action) {
      const id = action.payload;
      const item = state.cart.find((it) => it.pizzaId === id);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const item = state.cart.find((it) => it.pizzaId === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
  },
});

export const {
  addItem,
  clearCart,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
