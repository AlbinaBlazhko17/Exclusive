import { createAction } from "@reduxjs/toolkit";

export const addItemToWishlist = createAction('ADD_ITEM_TO_WISHLIST');
export const removeItemFromWishlist = createAction('REMOVE_ITEM_FROM_WISHLIST');
export const loadFromLocalStorage = createAction('LOAD_FROM_LOCALSTORAGE');
export const addItemToCart = createAction('ADD_ITEM_TO_CART');
export const removeItemFromCart = createAction('REMOVE_ITEM_FROM_CART');
export const removeAllItemsFromCart = createAction('REMOVE_ALL_ITEMS_FROM_CART');