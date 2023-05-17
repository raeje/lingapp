import React from "react";
import { NavLink } from "react-router-dom";

const LINK_ACTIVE_CLASS_NAME =
  "h-full w-full rounded-sm flex items-center text-red-400 border-t-4 border-red-400";
const LINK_INACTIVE_CLASS_NAME =
  "h-full w-full text-gray-400 font-normal flex items-center border-t-4 border-white hover:bg-custom-yellow hover:text-black";

const NavButton = ({ path, name, icon }) => {
  return (
    <NavLink
      to={{
        pathname: path,
      }}
      className={({ isActive }) =>
        isActive ? LINK_ACTIVE_CLASS_NAME : LINK_INACTIVE_CLASS_NAME
      }
    >
      <div className="flex flex-col place-items-center space-between text-xs h-full w-full pt-3">
        {icon}
        <span className="mt-2">{name}</span>
      </div>
    </NavLink>
  );
};

export default NavButton;
