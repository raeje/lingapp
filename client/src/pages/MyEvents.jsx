import React, { useState, useEffect } from "react";
import { EventCard, NoAvailableEventsMessage } from "../components";
import { getEvents } from "../helpers/api/lingapp/events";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const events = await getEvents();
      const myEvents = await events.filter((event) => event.has_applied);
      setEvents(myEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-max w-full overflow-x-hidden pt-1 pb-24 bg-gray-300 flex flex-col items-center md:bg-gray-100 md:gap-4 md:pt-4">
      {events.length < 1 ? <NoAvailableEventsMessage /> : ""}

      {events.map((event, index) => {
        return <EventCard event={event} key={index} />;
      })}
    </div>
  );
};

export default MyEvents;
