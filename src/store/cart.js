import { createSlice } from "@reduxjs/toolkit";

// each item has a id, title, price and counter

const initialCartState = {
  items: [],
  showCart: false,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      ++state.totalItems;
      const wantedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (wantedItem) {
        wantedItem.quantity++;
      } else {
        const newItem = {
          id: action.payload.id,
          title: action.payload.title,
          quantity: 1,
          price: action.payload.price,
        };
        state.items.push(newItem);
      }
    },
    incrementItem(state, action) {
      ++state.totalItems;
      const wantedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      wantedItem.quantity++;
    },
    decrementItem(state, action) {
      --state.totalItems;
      const wantedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (wantedItem.quantity === 1) {
        const updatedItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.items = updatedItems;
      } else {
        wantedItem.quantity--;
      }
    },
    removeItem(state, action) {
      --state.totalItems;
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = updatedItems;
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
