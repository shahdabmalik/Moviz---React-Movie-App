import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./home/homeSlice";

export const store = configureStore({
    reducer: {
        home: homeSlice
    }
})