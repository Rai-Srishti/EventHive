import React from 'react';
import { useSelector } from 'react-redux';
import EventBox from './EventBox';

const EventBoxList = ({ events }) => {
  const favourites = useSelector((state) => state.favourites.items);

  return (
    <div className="event-box-list">
      {events.map((event) => {
        const isFavourite = favourites.some((fav) => fav.eventId === event.eventId);
        return (
          <EventBox
            key={event.eventId}
            event={event}
            isFavourite={isFavourite}
          />
        );
      })}
    </div>
  );
};

export default EventBoxList;
