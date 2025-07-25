import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../components/EventCard';

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.items);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4">Your Favourite Events</h3>
      {favourites && favourites.length > 0 ? (
        <div className="row">
          {favourites.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-muted">No events in favourites.</p>
      )}
    </div>
  );
};

export default Favourites;
