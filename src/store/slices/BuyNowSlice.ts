import { createSlice } from "@reduxjs/toolkit";

export const buyNowSlice = createSlice({
	name: 'wishlist',
	initialState : {},
	reducers: {
		addItemToBuyNow: (state, action) => {
			return { ...action.payload };
		},
		removeItemFromBuyNow: () => {
			return;
		},
	}
})

export default buyNowSlice.reducer;