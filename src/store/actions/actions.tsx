import { buyNowSlice } from "../slices/BuyNowSlice";
import { cartSlice } from "../slices/CartSlice";
import { wishlistSlice } from "../slices/WishlistSlice";

export const { addItemToBuyNow, removeItemFromBuyNow } = buyNowSlice.actions;
export const { addItemToCart, removeItemFromCart, removeAllItemsFromCart } = cartSlice.actions;
export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;
