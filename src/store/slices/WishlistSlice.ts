import { IProductWithQuantity } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState: [],
	reducers: {
		addItemToWishlist: (state, action) => {
			return [...state, ...state.concat(action.payload)];
		},
		removeItemFromWishlist: (state, action) => {
			return state.filter((item) => item.id !== action.payload);
		},
	}
})

export default wishlistSlice.reducer;