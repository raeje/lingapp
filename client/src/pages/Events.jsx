import React, { useState, useEffect } from "react";
import {
  EventCategoryCard,
  EventCard,
  NoAvailableEventsMessage,
} from "../components";
import { getEvents } from "../helpers/api/lingapp/events";
import {
  All,
  Animal,
  Cultural,
  Disaster,
  Education,
  Environment,
  Health,
  Social,
} from "../images";

const RESPONSIVE_CLASS_NAMES = "md:bg-gray-100 md:gap-4";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const events = await getEvents();
      setEvents(events);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filterEvent = async (category) => {
    if (category.toUpperCase() === "ALL") {
      fetchData();
      return;
    }
    const events = await getEvents();
    const filteredEvents = events.filter(
      (event) => event.category.toUpperCase() === category.toUpperCase()
    );

    setEvents(filteredEvents);
  };

  return (
    <div
      className={`h-full w-full overflow-x-hidden pt-1 pb-24 bg-gray-200 flex flex-col items-center [&>div]:flex-shrink-0 ${RESPONSIVE_CLASS_NAMES}`}
    >
      <div className="h-56 w-full md:h-max md:w-2/5 md:bg-gray-100 flex items-center overflow-y-auto bg-white px-2 mb-2 gap-2 [&>div]:flex-shrink-0 z-30">
        <EventCategoryCard image={All} name="All" filterEvent={filterEvent} />
        <EventCategoryCard
          image={Animal}
          name="Animal"
          filterEvent={filterEvent}
        />
        <EventCategoryCard
          image={Cultural}
          name="Cultural"
          filterEvent={filterEvent}
        />
        <EventCategoryCard
          image={Disaster}
          name="Disaster"
          filterEvent={filterEvent}
        />
        <EventCategoryCard
          image={Education}
          name="Educational"
          filterEvent={filterEvent}
        />
        <EventCategoryCard
          image={Environment}
          name="Environmental"
          filterEvent={filterEvent}
        />
        <EventCategoryCard
          image={Health}
          name="Health"
          filterEvent={filterEvent}
        />
        <EventCategoryCard
          image={Social}
          name="Social"
          filterEvent={filterEvent}
        />
      </div>

      {events.length < 1 ? <NoAvailableEventsMessage /> : ""}

      {events.map((event, index) => {
        return <EventCard event={event} key={index} />;
      })}
    </div>
  );
};

export default Events;
