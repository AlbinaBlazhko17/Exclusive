import { IProductWithQuantity } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
	results: IProductWithQuantity[];
}

const initialState: CartState = {
	results: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemToCart: (state, action) => {
			const newItem = { ...action.payload } as IProductWithQuantity;
			const existingItemIndex = state.results.findIndex((item: IProductWithQuantity) => item.id === newItem.id);
			let updatedResults: IProductWithQuantity[] = [];

			if (existingItemIndex !== -1 && state.results.length !== 0) {
				updatedResults = state.results.map(item =>
					item.id === newItem.id ? { ...item, cartQuantity: item.cartQuantity + newItem.cartQuantity } : item
				);
			} else {
				updatedResults = [...state.results, newItem];
			}
			return {...state, results: updatedResults };
		},
		removeItemFromCart: (state, action) => {
			return state.results.filter((item) => item.id !== action.payload);
		},
		removeAllItemsFromCart: () => {
			return {results: []}
		}
	}
})

export default cartSlice.reducer;