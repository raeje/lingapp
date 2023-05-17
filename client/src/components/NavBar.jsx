import React from "react";
import { HomeIcon, BellIcon } from "@heroicons/react/24/solid";
import NavButton from "./NavButton";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";

const NavBar = () => {
  const { decodedToken, isExpired } = useJwt(getItem("Authorization"));

  const CreateEventButton = () => {
    return (
      <button className="bg-green-300 text-white text-4xl w-12 h-12 rounded-full relative -top-10 -left-1/2 -translate-x-1/2 text-center align-middle pb-2">
        +
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 bg-white h-20 w-full grid grid-cols-4 gap-4 place-items-center z-3 ">
      <NavButton path="/" name="Home" icon={<HomeIcon className="h-8 w-8" />} />
      <NavButton
        path="/notifications"
        name="Notifications"
        icon={<BellIcon className="h-8 w-8" />}
      />

      {decodedToken?.role === "organizer" ? <CreateEventButton /> : ""}
    </div>
  );
};

export default NavBar;
