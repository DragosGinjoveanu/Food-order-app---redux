import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import orderReducer from "./order";

const store = configureStore({
  reducer: { cart: cartReducer, order: orderReducer },
});

export default store;
