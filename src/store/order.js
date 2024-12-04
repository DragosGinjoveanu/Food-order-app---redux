import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
  showOrder: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    toggleOrder(state) {
      state.showOrder = !state.showOrder;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
