import { createReducer } from "@reduxjs/toolkit";
import { addItem, removeItem, removeAllItems } from '../actions/actions';
import { setLocalStorage} from '../../utils/localStorage';


function createStorageReducer(initialState) {
	return createReducer(initialState, (builder) => {
		builder
			.addCase(addItem, (state, action) => {
			const { item, storageKey } = action.payload;
	
			const newItem = { ...item };
	
			const updatedResults = [...state.results, newItem];
	
			const updatedResultsObject = updatedResults.reduce((acc, item, index) => {
				acc[index] = item;
				return acc;
			}, {});
	
			setLocalStorage(storageKey, updatedResultsObject);
	
			return {
				...state,
				results: updatedResults,
			};
		})
		.addCase(removeItem, (state, action) => {
			const { id, storageKey } = action.payload;
	
			const updatedResults = state.results.filter((item) => item.id !== id);
	
			const updatedResultsObject = updatedResults.reduce((acc, item, index) => {
				acc[index] = item;
				return acc;
			}, {});
	
			setLocalStorage(storageKey, updatedResultsObject);
	
			return {
				...state,
				results: updatedResults,
			};
		})
		.addCase(removeAllItems, (state, action) => {
			const { storageKey } = action.payload;
			localStorage.removeItem(storageKey);
			return {
				...initialState,
			};
		})
		.addDefaultCase((state) => state);
	});
  }
  


export default createStorageReducer;