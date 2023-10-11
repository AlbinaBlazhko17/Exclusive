import { IProductWithQuantity } from "@/interfaces/product.interface";
import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		addItemToCart: (state, action) => {
			const newItem = { ...action.payload } as IProductWithQuantity;
			const existingItemIndex = state.findIndex((item: IProductWithQuantity) => item.id === newItem.id);
			let updatedResults: IProductWithQuantity[] = [];
			if (existingItemIndex !== -1 && state.length !== 0) {
				updatedResults = state.map(item =>
					item.id === newItem.id ? { ...item, cartQuantity: item.cartQuantity + newItem.cartQuantity } : item
				);
			} else {
				updatedResults = state.concat(action.payload);
			}
			return [...state, ...updatedResults ];
		},
		removeItemFromCart: (state, action) => {
			return state.filter((item) => item.id !== action.payload);
		},
		removeAllItemsFromCart: () => {
			return [];
		}
	}
})

export default cartSlice.reducer;