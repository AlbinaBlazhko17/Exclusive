import { createAction } from '@reduxjs/toolkit';

export const addPersonToWishlist = createAction('ADD_PERSON_TO_WISHLIST');

export const removePersonFromWishlist = createAction('REMOVE_PERSON_FROM_WISHLIST');
export const loadFromLocalStorage = createAction('LOAD_FROM_LOCALSTORAGE');