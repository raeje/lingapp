import React, { useState, useEffect } from "react";
import { Outlet, useParams, useNavigate, NavLink } from "react-router-dom";
import { getEvent } from "../helpers/api/lingapp/events";

import {
  InformationCircleIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";

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

const Event = () => {
  const { id } = useParams();
  const { decodedToken } = useJwt(getItem("Authorization"));
  const [event, setEvent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const event = await getEvent(id);
      console.log(event);
      setEvent(event);
    } catch (error) {
      console.log(error);
    }
  };

  const EventTabs = ({ isEventOrganizer, isApproved }) => {
    const LINK_ACTIVE_CLASS_NAME =
      "bg-white w-full flex items-center pl-2 text-xs text-center rounded-t-2xl font-bold";
    const LINK_INACTIVE_CLASS_NAME =
      "bg-gray-200 w-full flex items-center pl-2 text-xs text-center rounded-t-2xl";

    return (
      <div className="h-10 w-full bg-gray-300 mt-1 flex text-center ">
        <NavLink
          to={{
            pathname: `/events/${id}/info`,
          }}
          className={({ isActive }) =>
            isActive ? LINK_ACTIVE_CLASS_NAME : LINK_INACTIVE_CLASS_NAME
          }
        >
          <InformationCircleIcon className="h-5 w-5 mr-1" />
          INFO
        </NavLink>

        {isEventOrganizer ? (
          <NavLink
            to={{
              pathname: `/events/${id}/attendance`,
            }}
            className={({ isActive }) =>
              isActive ? LINK_ACTIVE_CLASS_NAME : LINK_INACTIVE_CLASS_NAME
            }
          >
            <ClipboardDocumentCheckIcon className="h-5 w-5 mr-1" />
            ATTENDANCE
          </NavLink>
        ) : (
          ""
        )}

        {isApproved ? (
          <NavLink
            to={{
              pathname: `/events/${id}/chat`,
            }}
            className={({ isActive }) =>
              isActive ? LINK_ACTIVE_CLASS_NAME : LINK_INACTIVE_CLASS_NAME
            }
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
            CHAT
          </NavLink>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className="h-max w-full md:w-1/2 overflow-x-hidden pb-24 bg-gray-300 ">
      {/* Event Header */}
      <div className="relative mb-2">
        <img
          src={event.image}
          alt="event"
          className="object-cover h-64 w-full"
        />
        <div className="h-1/4 w-full absolute bottom-0 left-0 bg-white bg-opacity-90 flex flex-col p-2">
          <span className="text-red-500 font-bold text-xs">
            {eventDatetimeRange(event.starts_at, event.ends_at).toUpperCase()}
          </span>
          <span className="font-bold text-2xl">{event.name}</span>
        </div>
      </div>

      <EventTabs
        isEventOrganizer={decodedToken?.user_id === event?.organizer?.id}
        isApproved={event?.is_approved}
      />

      <Outlet />

      {/* Actions */}
      <div className="h-max w-full bg-white p-4 flex flex-col mb-2 gap-2">
        <button
          onClick={() => navigate("/")}
          className="p-4 bg-red-300 rounded-lg text-white font-bold text-xl"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Event;
