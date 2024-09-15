import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./Slices/postsSlice";
import paramsSlice from "./Slices/paramsSlice";
import cartSlice from "./Slices/cartSlice";

const store = configureStore({
	reducer: {
		posts: postsSlice,
		params: paramsSlice,
		cart: cartSlice
	}
})

export default store