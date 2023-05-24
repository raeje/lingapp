import React from "react";
import { updateUserNotification } from "../helpers/api/lingapp/user_notifications";

const NotificationCard = ({ notif, refreshNotifs }) => {
  const bgColor = (title) => {
    const titleIncludes = (word) => {
      return title.toUpperCase().includes(word.toUpperCase());
    };
    if (titleIncludes("approved") || titleIncludes("created")) {
      return " bg-green-50 ";
    }
    if (titleIncludes("cancelled")) {
      return " bg-red-50 ";
    }
    return " bg-blue-50 ";
  };

  const elapsedTime = (date) => {
    const currentTime = new Date();
    const createTime = new Date(date);
    const elapsed = Math.floor((currentTime - createTime) / 1000);

    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const remainingSeconds = elapsed % 60;

    const hoursFormat = hours ? `${hours.toString().padStart(2, "0")}h` : "";
    const minutesFormat = minutes
      ? `${minutes.toString().padStart(2, "0")}m`
      : "";
    const remainingSecondsFormat = remainingSeconds
      ? `${remainingSeconds.toString().padStart(2, "0")}s`
      : "";
    return `${hoursFormat} ${minutesFormat} ${remainingSecondsFormat} ago`;
  };

  const handleMarkAsRead = async (id) => {
    await updateUserNotification(id);
    await refreshNotifs();
  };

  return (
    <div
      className={`h-max w-full grid grid-cols-5 gap-2 my-1 p-2 ${bgColor(
        notif.title
      )}`}
    >
      <div className="col-span-4">
        <h1 className="font-bold mb-2">{notif.title}</h1>
        <span className="text-sm">{notif.body}</span>
        <br />
        <span className="text-sm">{elapsedTime(notif.created_at)}</span>
      </div>
      <div className="col-span-1 grid items-center">
        <button
          onClick={() => handleMarkAsRead(notif.id)}
          className="bg-red-400 font-bold p-2 text-white rounded-lg"
        >
          Mark as read
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
