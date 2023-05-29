import React, { useState, useEffect } from "react";
import { getEvents } from "../helpers/api/lingapp/events";
import {
  GlobeAsiaAustraliaIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onView, onNavigate }) => {
  const handlePrev = () => {
    onNavigate("PREV");
  };

  const handleNext = () => {
    onNavigate("NEXT");
  };

  const handleToday = () => {
    onNavigate("TODAY");
  };

  const handleMonthView = () => {
    onView("month");
  };

  const handleWeekView = () => {
    onView("week");
  };

  const handleDayView = () => {
    onView("day");
  };

  const headerNavigationIconClass =
    "h-8 w-8 bg-red-400 rounded p-1 box-content text-white m-1";
  const headerViewsClass =
    "h-8 w-content bg-red-400 rounded py-1 px-2 text-white m-1";
  return (
    <div className="custom-toolbar w-full bg-red-50 grid grid-cols-5 place-content-center ">
      <div className="calendar-header-views col-span-5 flex justify-center text-xs">
        <button
          className={`calendar-header-button ${headerViewsClass}`}
          onClick={handleMonthView}
        >
          Month
        </button>
        <button
          className={`calendar-header-button ${headerViewsClass}`}
          onClick={handleWeekView}
        >
          Week
        </button>
        <button
          className={`calendar-header-button ${headerViewsClass}`}
          onClick={handleDayView}
        >
          Day
        </button>
      </div>

      <h3 className="calendar-header-label col-span-3 font-bold text-4xl p-2 text-red-700">
        {label}
      </h3>

      <div className="calendar-header-navigation col-span-2 flex items-center justify-center">
        <button className="calendar-header-button" onClick={handlePrev}>
          <BackwardIcon className={headerNavigationIconClass} />
        </button>
        <button className="calendar-header-button" onClick={handleToday}>
          <GlobeAsiaAustraliaIcon className={headerNavigationIconClass} />
        </button>
        <button className="calendar-header-button" onClick={handleNext}>
          <ForwardIcon className={headerNavigationIconClass} />
        </button>
      </div>
    </div>
  );
};

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const events = await getEvents();
      const myEvents = await events.filter((event) => event.has_applied);
      const formattedEvents = await myEvents.map((event) => {
        return {
          title: event.name,
          start: new Date(event.starts_at),
          end: new Date(event.ends_at),
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="calendar-container w-full md:w-2/5 md:mt-6">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          backgroundColor: "white",
          height: "500px",
        }}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};
export default MyCalendar;
