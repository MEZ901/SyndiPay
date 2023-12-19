import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export const { setPayments } = paymentSlice.actions;

export default paymentSlice.reducer;
