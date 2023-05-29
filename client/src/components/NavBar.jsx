import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  BellIcon,
  PlusIcon,
  RectangleStackIcon,
  TrophyIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import NavButton from "./NavButton";
import { NavLink } from "react-router-dom";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";
import { getUserNotifications } from "../helpers/api/lingapp/user_notifications";

const POLLING_TIMEOUT_SECS =
  Number(process.env.REACT_APP_POLLING_TIMEOUT_SECS) || 10;

const NavBar = () => {
  const { decodedToken } = useJwt(getItem("Authorization"));
  const user_id = decodedToken?.user_id;
  const [notifCount, setNotifCount] = useState(0);
  const [counter, setCounter] = useState(0);

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

  const CreateEventLink = () => {
    return (
      <div className="h-16 w-16 bg-white absolute -top-5 left-1/2 transform -translate-x-1/2 border-b-2 border-gray-400 rounded-full grid place-items-center">
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

  const AchievementsLink = () => {
    return (
      <div className="h-16 w-16 bg-white absolute -top-5 left-1/2 transform -translate-x-1/2  border-b-2 border-gray-400 rounded-full grid place-items-center">
        <NavLink
          className="h-16 w-16 bg-red-400 text-white rounded-full text-center grid place-items-center border-2 border-white"
          to={`/users/${user_id}/achievements`}
          name="achievements"
        >
          <TrophyIcon className="h-8 w-8 stroke-2" />
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
          path="/my-events"
          name="My Events"
          icon={<RectangleStackIcon className="h-8 w-8" />}
        />

        <div></div>

        <NavButton
          path="/my-calendar"
          name="Calendar"
          icon={<CalendarDaysIcon className="h-8 w-8" />}
        />

        <NavButton
          path="/notifications"
          name="Notifications"
          icon={<BellIcon className="h-8 w-8" />}
          notifCount={notifCount}
        />

        {decodedToken?.role === "organizer" ? (
          <CreateEventLink />
        ) : (
          <AchievementsLink user_id={user_id} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
