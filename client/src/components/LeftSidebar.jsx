import React, { useState, useEffect } from "react";
import LeftSidebarButton from "./LeftSidebarButton";
import {
  HomeIcon,
  BellIcon,
  PlusIcon,
  RectangleStackIcon,
  TrophyIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";
import { getUserNotifications } from "../helpers/api/lingapp/user_notifications";
import { getUser } from "../helpers/api/lingapp/users";
import { RiLogoutBoxLine } from "react-icons/ri";
import { setItem } from "../helpers/localStorage";
import { useNavigate } from "react-router-dom";

const POLLING_TIMEOUT_SECS =
  Number(process.env.REACT_APP_POLLING_TIMEOUT_SECS) || 10;

const LeftSidebar = () => {
  const { decodedToken } = useJwt(getItem("Authorization"));
  const user_id = decodedToken?.user_id;
  const [currentUser, setCurrentUser] = useState(null);
  const [notifCount, setNotifCount] = useState(0);
  const [counter, setCounter] = useState(0);

  const navigate = useNavigate();

  const handleLogout = () => {
    setItem("Authorization", "");
    navigate("/login");
  };

  const fetchUserData = async () => {
    try {
      const response = await getUser(user_id);
      setCurrentUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) {
    setTimeout(() => {
      fetchUserData();
    }, 1000);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setCounter(counter + 1);
      fetchData();
    }, POLLING_TIMEOUT_SECS * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const fetchData = async () => {
    try {
      const notifs = await getUserNotifications();
      setNotifCount(notifs.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-80 fixed top-0 left-0 z-10 box-border bg-gray-100 pt-16 px-4">
      <div className="h-max w-full static flex flex-col gap-2">
        {/* Current User Info*/}
        {decodedToken ? (
          <div className="h-max px-2 py-4 flex flex-col -gap-1 static border-b-2 border-gray-200 mb-4">
            <span className="font-bold">
              {currentUser?.first_name} {currentUser?.last_name}
            </span>
            <span className="text-sm text-gray-500">{currentUser?.email}</span>
            <span className="absolute w-4/5 top-14 left-2 text-5xl font-extrabold opacity-30 -z-10 text-right text-red-300 italic">
              {currentUser?.role?.toUpperCase()}
            </span>
          </div>
        ) : (
          ""
        )}

        <LeftSidebarButton
          path="/notifications"
          name="Notifications"
          icon={<BellIcon className="h-6 w-6" />}
          notifCount={notifCount}
        />

        <LeftSidebarButton
          path="/"
          name="Home"
          icon={<HomeIcon className="h-6 w-6" />}
        />

        <LeftSidebarButton
          path="/my-events"
          name="My Events"
          icon={<RectangleStackIcon className="h-6 w-6" />}
        />

        <LeftSidebarButton
          path="/my-calendar"
          name="Calendar"
          icon={<CalendarDaysIcon className="h-6 w-6" />}
        />

        {decodedToken?.role === "organizer" ? (
          <LeftSidebarButton
            path="/events/new"
            name="Create Event"
            icon={<PlusIcon className="h-6 w-6" />}
          />
        ) : (
          <LeftSidebarButton
            path={`/users/${user_id}/achievements`}
            name="Achievements"
            icon={<TrophyIcon className="h-6 w-6" />}
          />
        )}

        <div className="mt-4 py-4 border-t-2 border-gray-300">
          <button
            className="h-full w-full text-gray-400 font-normal flex items-center border-gray-300 p-2 hover:bg-gray-200 hover:text-gray-700"
            onClick={handleLogout}
          >
            <RiLogoutBoxLine className="h-6 w-6" />
            <span className="ml-2 text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
