import { combineReducers } from "redux";
import cart from "./CartReducer";
import wishlist from "./WishlistReducer";


export default combineReducers({
	cart,
	wishlist,
});