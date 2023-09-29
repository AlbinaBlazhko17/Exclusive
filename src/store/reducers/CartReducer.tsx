import { createReducer } from "@reduxjs/toolkit";
import { addItemToCart, removeItemFromCart } from '../actions/actions';
import {getLocalStorage, setLocalStorage} from '../../utils/localStorage';


const initialState = {
	results: Object.values(getLocalStorage('cart')) || [],
}

const cart = createReducer(initialState, (builder) => {
		builder.addCase(addItemToCart, (state, action) => {
			const newItem = { ...action.payload };

			const updatedResults = [...state.results, newItem];

			const updatedResultsObject = updatedResults.reduce((acc, item, index) => {
				acc[index] = item;
				return acc;
			}, {});

			setLocalStorage('cart', updatedResultsObject);

			return {
				...state,
				results: updatedResults,
			};
		})
})


export default cart;