import React from "react";
import { NavLink } from "react-router-dom";

const LINK_ACTIVE_CLASS_NAME =
  "h-full w-full rounded-sm flex items-center text-red-400 font-bold border-l-2 border-red-400 hover:bg-gray-200";
const LINK_INACTIVE_CLASS_NAME =
  "h-full w-full text-gray-400 font-normal flex items-center border-l-2 border-gray-300 hover:bg-gray-200 hover:text-gray-700";

const LeftSidebarButton = ({ path, name, icon, notifCount = 0 }) => {
  return (
    <NavLink
      to={{
        pathname: path,
      }}
      className={({ isActive }) =>
        isActive ? LINK_ACTIVE_CLASS_NAME : LINK_INACTIVE_CLASS_NAME
      }
    >
      <div className="flex place-items-center items-center rounded-lg space-between text-xs h-full w-full p-2 relative ">
        {icon}
        <span className="ml-2 text-md">{name}</span>
        {name === "Notifications" && notifCount ? (
          <div className="h-4 w-4 grid place-content-center bg-red-500 text-white text-xs absolute top-1 left-5 rounded-full">
            {notifCount}
          </div>
        ) : (
          ""
        )}
      </div>
    </NavLink>
  );
};

export default LeftSidebarButton;
