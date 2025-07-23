import { createSlice } from '@reduxjs/toolkit';

const storedFavourites = localStorage.getItem('favourites');
const initialState = {
  items: storedFavourites ? JSON.parse(storedFavourites) : [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('favourites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
