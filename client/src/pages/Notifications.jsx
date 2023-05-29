import React, { useState, useEffect } from "react";
import { getUserNotifications } from "../helpers/api/lingapp/user_notifications";
import { NotificationCard } from "../components";

const Notifications = () => {
  const [notifs, setNotifs] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const notifs = await getUserNotifications();
      setNotifs(notifs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-max w-full overflow-x-hidden pt-1 pb-24 bg-gray-300 flex flex-col items-center md:w-2/5 md:bg-gray-50 md:gap-2">
      {notifs.map((notif) => (
        <NotificationCard
          notif={notif}
          refreshNotifs={() => fetchData()}
          key={notif.id}
        />
      ))}
    </div>
  );
};

export default Notifications;
