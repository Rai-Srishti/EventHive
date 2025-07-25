import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './FavouriteSlice';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});
