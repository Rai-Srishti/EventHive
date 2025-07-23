// src/components/EventBoxList.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import EventBox from './EventBox';

const EventBoxList = ({ events }) => {
  const favourites = useSelector((state) => state.favourites.items);

  return (
    <div className="event-box-list">
      {events.map((event) => {
        const isFavourite = favourites.some((fav) => fav.id === event.id);
        return (
          <EventBox key={event.id} event={event} isFavourite={isFavourite} />
        );
      })}
    </div>
  );
};

export default EventBoxList;
