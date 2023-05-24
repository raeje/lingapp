import React from "react";
import { NavLink } from "react-router-dom";

const LINK_ACTIVE_CLASS_NAME =
  "h-full w-full rounded-sm flex items-center text-red-400 border-t-4 border-red-400";
const LINK_INACTIVE_CLASS_NAME =
  "h-full w-full text-gray-400 font-normal flex items-center border-t-4 border-white";

const NavButton = ({ path, name, icon, notifCount = 0 }) => {
  return (
    <NavLink
      to={{
        pathname: path,
      }}
      className={({ isActive }) =>
        isActive ? LINK_ACTIVE_CLASS_NAME : LINK_INACTIVE_CLASS_NAME
      }
    >
      <div className="flex flex-col place-items-center space-between text-xs h-full w-full pt-3 relative">
        {icon}
        <span className="mt-2">{name}</span>
        {name === "Notifications" && notifCount ? (
          <div className="h-6 w-6 grid place-content-center bg-red-500 text-white text-sm absolute top-2 right-2 rounded-full">
            {notifCount}
          </div>
        ) : (
          ""
        )}
      </div>
    </NavLink>
  );
};

export default NavButton;
