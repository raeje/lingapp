import React, { useState, useEffect } from "react";
import { getEvents } from "../helpers/api/lingapp/events";

const EventCard = ({ event }) => {
  return (
    <div className="h-96 w-full md:w-80 bg-white py-2 mb-2" key={event.id}>
      <div className="h-16 w-full p-2 grid grid-cols-4">
        <h1 className="font-bold col-span-3">{event.name}</h1>
        <span className="font-bold text-sm text-red-400 text-right">
          {event.category.toUpperCase()}
        </span>
        <span className="text-sm col-span-3">{event.starts_at}</span>
        <span className="text-sm text-gray-400 text-right">
          {event.organizer.first_name} {event.organizer.last_name}
        </span>
      </div>

      <div className="h-64 w-full border border-1 border-black">Image</div>

      <div className="w-full p-2">Actions</div>
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const events = await getEvents();
      setEvents(events);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-max w-full pb-24 bg-gray-400">
      {events.map((event) => {
        return <EventCard event={event} />;
      })}
    </div>
  );
};

export default Events;
