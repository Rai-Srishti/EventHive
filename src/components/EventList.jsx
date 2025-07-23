// src/components/EventList.jsx
import React from 'react';
import EventCard from './EventCard';
import { useSelector } from 'react-redux';

const EventList = ({ events }) => {
  const favourites = useSelector(state => state.favourites.items);

  return (
    <>
      {events.map(event => {
        const isFavourite = favourites.some(fav => fav.id === event.id);
        return (
          <EventCard
            key={event.id}
            event={event}
            isFavourite={isFavourite}
          />
        );
      })}
    </>
  );
};

export default EventList;
