import { IProductWithQuantity } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
	results: IProductWithQuantity[];
}

const initialState: CartState = {
	results: [],
}

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		addItemToWishlist: (state, action) => {
			return {...state, results: state.results.concat(action.payload) };
		},
		removeItemFromWishlist: (state, action) => {
			return state.results.filter((item) => item.id !== action.payload);
		},
	}
})

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;