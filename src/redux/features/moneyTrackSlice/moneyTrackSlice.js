import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  data: [],
};

export const moneyTrackSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    getDatas: (state, action) => {
      state.data = action.payload;
    },
    addDatas: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    deleteData: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item) => item.id !== idToDelete);
    },
  },
});

export const { getDatas, addDatas, deleteData } = moneyTrackSlice.actions;
export default moneyTrackSlice.reducer;
