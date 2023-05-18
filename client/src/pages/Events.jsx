import React, { useState, useEffect } from "react";
import { EventCard } from "../components";
import { getEvents } from "../helpers/api/lingapp/events";

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
      {events.map((event, index) => {
        return <EventCard event={event} key={index} />;
      })}
    </div>
  );
};

export default Events;
