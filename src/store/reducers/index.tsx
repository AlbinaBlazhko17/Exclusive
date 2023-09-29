import { combineReducers } from "redux";
import wishlist from './wishlistReducer';
import cart from "./CartReducer";


export default combineReducers({
	wishlist,
	cart
});