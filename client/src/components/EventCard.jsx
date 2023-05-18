import React from "react";

const formatDate = (datetimeString) => {
  const date = new Date(datetimeString).toDateString().substring(4);
  const time = new Date(datetimeString)
    .toLocaleTimeString()
    .replace(/:\d{2}\s/, " ");
  return `${date} ${time}`;
};

const eventDatetimeRange = (datetimeStart, datetimeEnd) => {
  const start = formatDate(datetimeStart);
  const end = formatDate(datetimeEnd);
  return `${start} to ${end}`;
};

const EventCard = ({ event }) => {
  return (
    <div className="h-96 w-full md:w-80 bg-white py-2 mb-2" key={event.id}>
      <div className="h-20 w-full p-2 grid grid-cols-4">
        <h1 className="font-bold col-span-3 text-xl">{event.name}</h1>
        <span className="font-bold text-sm text-red-400 text-right">
          {event.category.toUpperCase()}
        </span>

        <div className="w-full col-span-3 flex">
          <span className="w-12 grow-0 text-xs text-gray-400">Starts </span>
          <span className="grow text-xs">{formatDate(event.starts_at)}</span>
          <span className="w-12 grow-0 text-xs text-gray-400">Ends </span>
          <span className="text-xs">{formatDate(event.ends_at)}</span>
        </div>

        <span className="text-xs text-gray-400 text-right ">
          {event.organizer.first_name} {event.organizer.last_name}
        </span>
      </div>

      <img src={event.image} alt="event" className="object-cover h-64 w-full" />

      <div className="w-full p-2">Actions</div>
    </div>
  );
};

export default EventCard;
