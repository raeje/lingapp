import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import logoGray from "../images/logo-gray.png";

const formatDate = (datetimeString) => {
  const date = new Date(datetimeString).toDateString().substring(4);
  const time = new Date(datetimeString)
    .toLocaleTimeString()
    .replace(/:\d{2}\s/, " ");
  return `${date} ${time}`;
};

const slotsRemaining = (max, attendees) => {
  const slots = max - attendees;
  if (slots > 1) {
    return `${slots} slots left!`;
  }

  return slots === 1 ? "Last slot! Hurry!" : "No slots available.";
};

const EventCard = ({ event }) => {
  const AppliedIndicator = () => {
    const textStyle = event.has_applied
      ? "text-red-400"
      : "text-gray-400 italic";
    return (
      <div className="flex gap-1 items-center align-center">
        <img
          src={event.has_applied ? logo : logoGray}
          alt="applied-indicator"
          className="h-7 w-7"
        />
        <span className={`${textStyle} text-sm`}>
          {event.has_applied ? "Submitted" : "Not yet listed"}
        </span>
      </div>
    );
  };

  return (
    <div
      className="h-96 w-full md:h-1/3 md:w-2/3 md:rounded-lg bg-white py-2 mb-2 z-10 box-border shadow-md shadow-black"
      key={event.id}
    >
      <div className="h-20 w-full p-2 grid grid-cols-5">
        <h1 className="font-bold col-span-3 text-xl">{event.name}</h1>
        <span className="font-bold col-span-2 text-sm text-red-400 text-right">
          {event.category.toUpperCase()}
        </span>

        <div className="w-full col-span-3 flex">
          <span className="w-12 grow-0 text-xs text-gray-400">Starts </span>
          <span className="grow text-xs">{formatDate(event.starts_at)}</span>
          <span className="w-12 grow-0 text-xs text-gray-400">Ends </span>
          <span className="text-xs">{formatDate(event.ends_at)}</span>
        </div>

        <span className="col-span-2 text-xs text-gray-400 text-right ">
          {event.organizer.first_name} {event.organizer.last_name}
        </span>
      </div>

      <NavLink
        exact="true"
        to={{
          pathname: `/events/${event.id}/info`,
        }}
      >
        <img
          src={event.image}
          alt="event"
          className="object-cover h-64 w-full"
        />
      </NavLink>
      <div className="w-full p-2 flex justify-between">
        <AppliedIndicator />
        <span className="italic text-red-600 font-bold pr-2">
          {slotsRemaining(
            event.maximum_participants,
            event.guest_list?.approved_count
          )}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
