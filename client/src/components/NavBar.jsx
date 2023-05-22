import React from "react";
import {
  HomeIcon,
  BellIcon,
  PlusIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import NavButton from "./NavButton";
import { NavLink } from "react-router-dom";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";

const NavBar = () => {
  const { decodedToken, isExpired } = useJwt(getItem("Authorization"));

  const CreateEventLink = () => {
    return (
      <div className="h-16 w-16 bg-white absolute -top-5 left-1/2 transform -translate-x-1/2  border-b-2 border-gray-400 rounded-full grid place-items-center">
        <NavLink
          className="h-16 w-16 bg-red-400 text-white rounded-full text-center grid place-items-center border-2 border-white"
          to="/events/new"
          name="create-event"
        >
          <PlusIcon className="h-10 w-10 stroke-2" />
        </NavLink>
      </div>
    );
  };

  return (
    <div className="fixed -bottom-1 h-20 w-full z-30 box-border">
      <div className="h-full w-full static bg-white grid grid-cols-5 gap-2 place-items-center z-3">
        <NavButton
          path="/"
          name="Home"
          icon={<HomeIcon className="h-8 w-8" />}
        />

        <NavButton
          path="/notifications"
          name="Notifications"
          icon={<BellIcon className="h-8 w-8" />}
        />

        <div></div>

        <NavButton
          path="/my-events"
          name="My Events"
          icon={<CalendarDaysIcon className="h-8 w-8" />}
        />

        <NavButton
          path="/asd"
          name="PH2"
          icon={<HomeIcon className="h-8 w-8" />}
        />

        {decodedToken?.role === "organizer" ? <CreateEventLink /> : ""}
      </div>
    </div>
  );
};

export default NavBar;
