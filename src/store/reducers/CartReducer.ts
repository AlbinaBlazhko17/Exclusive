import { createReducer } from "@reduxjs/toolkit";
import { addItemToCart, removeItemFromCart, removeAllItemsFromCart } from '../actions/actions';
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
		.addCase(removeItemFromCart, (state, action) => { 
			const idToRemove = action.payload.id;

			const updatedResults = state.results.filter((item) => item.id !== idToRemove);

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
		.addCase(removeAllItemsFromCart, (state, action) => {
			localStorage.removeItem('cart');
			return {
				results: []
			};
		})
		.addDefaultCase(state => state)
})


export default cart;