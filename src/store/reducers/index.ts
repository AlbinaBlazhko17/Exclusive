import { combineReducers } from "redux";
import cart from '../slices/CartSlice';
import wishlist from "../slices/WishlistSlice";
import buyNow from "../slices/BuyNowSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
	cart,
	wishlist,
	buyNow
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart', 'wishlist', 'buyNow'],
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);

