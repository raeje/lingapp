import React from "react";
import { HomeIcon, BellIcon, PlusIcon } from "@heroicons/react/24/solid";
import NavButton from "./NavButton";
import { NavLink } from "react-router-dom";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";

const NavBar = () => {
  const { decodedToken, isExpired } = useJwt(getItem("Authorization"));

  const CreateEventLink = () => {
    return (
      <NavLink
        className="bg-green-400 text-white w-12 h-12 rounded-full relative -top-10 -left-1/2 -translate-x-1/2 text-center py-2 flex place-content-center place-ite"
        to="/events/new"
        name="create-event"
      >
        <PlusIcon className="h-8 w-8" />
      </NavLink>
    );
  };

  return (
    <div className="fixed bottom-0 bg-white h-20 w-full grid grid-cols-4 gap-4 place-items-center z-3 border-t">
      <NavButton path="/" name="Home" icon={<HomeIcon className="h-8 w-8" />} />
      <NavButton
        path="/notifications"
        name="Notifications"
        icon={<BellIcon className="h-8 w-8" />}
      />

      {decodedToken?.role === "organizer" ? <CreateEventLink /> : ""}
    </div>
  );
};

export default NavBar;
