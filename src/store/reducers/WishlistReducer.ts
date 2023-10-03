import { createReducer } from "@reduxjs/toolkit";
import { addItemToWishlist, removeItemFromWishlist } from '../actions/actions';
import {getLocalStorage, setLocalStorage} from '../../utils/localStorage';


const initialState = {
	results: Object.values(getLocalStorage('wishlist')) || [],
}

const wishlist = createReducer(initialState, (builder) => {
		builder.addCase(addItemToWishlist, (state, action) => {
			const newItem = { ...action.payload };

			const updatedResults = [...state.results, newItem];

			const updatedResultsObject = updatedResults.reduce((acc, item, index) => {
				acc[index] = item;
				return acc;
			}, {});

			setLocalStorage('wishlist', updatedResultsObject);

			return {
				...state,
				results: updatedResults,
			};
		})
		.addCase(removeItemFromWishlist, (state, action) => { 
			const idToRemove = action.payload.id;

			const updatedResults = state.results.filter((item) => item.id !== idToRemove);

			const updatedResultsObject = updatedResults.reduce((acc, item, index) => {
				acc[index] = item;
				return acc;
			}, {});

			setLocalStorage('wishlist', updatedResultsObject);

			return {
				...state,
				results: updatedResults,
			};
		})
		.addDefaultCase(state => state)
})


export default wishlist;