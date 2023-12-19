import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  residents: [],
};

const residentSlice = createSlice({
  name: "resident",
  initialState,
  reducers: {
    setResidents: (state, action) => {
      state.residents = action.payload;
    },
  },
});

export const { setResidents } = residentSlice.actions;

export default residentSlice.reducer;
