import { createReducer } from "@reduxjs/toolkit";
import { addItemToBuyNow, removeItemFromBuyNow } from '../actions/actions';

const buyNow = createReducer(null, (builder) => {
	builder
		.addCase(addItemToBuyNow, (state, action) => {

		return { ...action.payload };
		})
		.addCase(removeItemFromBuyNow, (state, action) => {
			return null;
		})
		.addDefaultCase((state) => state);
  });
  


export default buyNow;