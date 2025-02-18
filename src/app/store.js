import { configureStore } from "@reduxjs/toolkit";
import itemListSlice from "../features/itemList/itemListSlice";

export const store = configureStore({
  reducer: {
    itemList: itemListSlice,
  },
});
