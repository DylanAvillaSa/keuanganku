import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/userSlice/userSlice";
import moneyTrackReducer from "@/redux/features/moneyTrackSlice/moneyTrackSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userId: moneyTrackReducer,
  },
});
