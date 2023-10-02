import { combineReducers } from "redux";
import createStorageReducer from "./CartReducer";
import { getLocalStorage } from "../../utils/localStorage";

const cartInitialState = {
	results: Object.values(getLocalStorage('cart')) || [],
};

const wishlistInitialState = {
	results: Object.values(getLocalStorage('wishlist')) || [],
};

const ordersInitialState = {
	results: Object.values(getLocalStorage('orders')) || [],
}

const cart = createStorageReducer(cartInitialState);
const wishlist = createStorageReducer(wishlistInitialState);
const orders = createStorageReducer(ordersInitialState);


export default combineReducers({
	cart,
	wishlist,
	orders
});