import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};
export const setUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setUser } = setUserSlice.actions;
 