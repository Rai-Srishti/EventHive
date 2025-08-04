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
      const event = action.payload;
      const existing = state.items.find(item => item.eventId === event.eventId);

      if (existing) {
        state.items = state.items.filter(item => item.eventId !== event.eventId);
      } else {
        state.items.push(event);
      }

      localStorage.setItem('favourites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
