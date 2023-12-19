import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apartments: [],
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    setApartments: (state, action) => {
      state.apartments = action.payload;
    },
  },
});

export const { setApartments } = apartmentSlice.actions;

export default apartmentSlice.reducer;
