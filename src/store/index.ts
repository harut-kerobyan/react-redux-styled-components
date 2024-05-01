import { configureStore } from "@reduxjs/toolkit";
import offersSlice from "./offersSlice";

export const store = configureStore({
  reducer: {
    offer: offersSlice,
  },
});
