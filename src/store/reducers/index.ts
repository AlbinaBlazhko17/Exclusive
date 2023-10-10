import { combineReducers } from "redux";
import cart from "./CartReducer";
import wishlist from "./WishlistReducer";
import buyNow from "./BuyNowReducer";
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
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);

