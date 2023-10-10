import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 } from 'redux-persist';
import { persistedReducer } from './reducers';

export const store = configureStore(
  { reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
   },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persister = persistStore(store);



// store.subscribe(() => {
//   const state = store.getState();
//   if (state.wishlist && state.wishlist.results) {
//     const data = state.wishlist.results;
//     Object.values(data).forEach((item) => {
//       localStorage.setItem(item.id, JSON.stringify(item));
//     });
//   }
// });

export default store;