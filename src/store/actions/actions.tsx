import { createAction } from '@reduxjs/toolkit';

export const addItem = createAction('ADD_ITEM');
export const removeItem = createAction('REMOVE_ITEM');
export const loadFromLocalStorage = createAction('LOAD_FROM_LOCALSTORAGE');
export const removeAllItems = createAction('REMOVE_ALL_ITEMS');