import React, { useState, useEffect } from "react";
import { getEvent, getGuestList } from "../helpers/api/lingapp/events";
import { GuestListTable } from "../components";
import { joinEvent, leaveEvent } from "../helpers/api/lingapp/events_user";
import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";
import {
  DocumentTextIcon,
  TagIcon,
  UserIcon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const EventInfo = () => {
  const { id } = useParams();
  const { decodedToken } = useJwt(getItem("Authorization"));
  const [event, setEvent] = useState([]);
  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    fetchData();
    fetchGuestList();
  }, []);

  const fetchData = async () => {
    try {
      const event = await getEvent(id);
      await fetchGuestList();
      setEvent(event);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGuestList = async () => {
    try {
      const guestList = await getGuestList(id);
      setGuestList(guestList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinEvent = async () => {
    const response = await joinEvent(id);

    if ((await response.status) === 201) {
      toast.success("Join request sent!");
      fetchData();
    } else {
      toast.error(response.errors);
    }
  };

  const RequestJoinEventButton = () => {
    return (
      <button
        className="w-full p-4 mt-4 mb-2 bg-red-500 rounded-lg text-white font-bold text-xl"
        onClick={handleJoinEvent}
      >
        Sign me up!
      </button>
    );
  };

  const handleLeaveEvent = async () => {
    const response = await leaveEvent(id);
    if (response.status === 200) {
      toast.info(response.data.message);
      fetchData();
    } else {
      toast.error(response.errors);
    }
  };

  const CancelRequestEventButton = () => {
    return (
      <button
        className="w-full p-4 mt-4 mb-2 bg-gray-500 rounded-lg text-white font-bold text-xl"
        onClick={handleLeaveEvent}
      >
        Cancel event participation
      </button>
    );
  };

  return (
    <div>
      <div className="h-max w-full bg-white p-2 flex flex-col mb-2">
        <span className="font-bold text-lg mb-2">Event Details</span>

        <div className="flex content-center items-center">
          <DocumentTextIcon className="h-4 w-4 mr-2" />
          <span className="text-gray-500 ">Description</span>
        </div>
        <span className="p-2 bg-gray-50 rounded-md mb-2">
          {event.description}
        </span>

        <div className="flex content-center items-center">
          <TagIcon className="h-4 w-4 mr-2" />
          <span className="text-gray-500 ">Category</span>
        </div>
        <span className="p-2 bg-gray-50 rounded-md mb-2">
          {event.category?.toUpperCase()}
        </span>

        <div className="flex content-center items-center">
          <UserIcon className="h-4 w-4 mr-2" />
          <span className="text-gray-500 ">Organizer</span>
        </div>
        <span className="p-2 bg-gray-50 rounded-md mb-2">
          {event.organizer?.first_name} {event.organizer?.last_name}
        </span>
      </div>

      {/* Location */}
      <div className="h-max w-full bg-white p-2 flex flex-col mb-2">
        <span className="font-bold text-lg mb-2">Location</span>

        <div className="flex content-center items-center">
          <MapIcon className="h-4 w-4 mr-2" />
          <span className="text-gray-500 ">Address</span>
        </div>
        <span className="p-2 bg-gray-50 rounded-md mb-2">
          {`${event.house}, Barangay ${event.barangay}, ${event.city} City`}
        </span>

        <div className="flex content-center items-center">
          <MapPinIcon className="h-4 w-4 mr-2" />
          <span className="text-gray-500 ">Landmark</span>
        </div>
        <span className="p-2 bg-gray-50 rounded-md mb-2">
          {`${event.landmark || "not specified"}`}
        </span>
      </div>

      {/* Guest List */}
      <div className="h-max w-full bg-white p-2 flex flex-col mb-2">
        <span className="font-bold text-lg mb-2">Guest List</span>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col content-center items-center py-1">
            <span className="font-extrabold text-lg">
              {event.guest_list?.approved_count || 0}
            </span>
            <span className="text-gray-600 text-sm">APPROVED</span>
          </div>

          <div className="flex flex-col content-center items-center py-1">
            <span className="font-extrabold text-lg">
              {event.guest_list?.pending_count || 0}
            </span>
            <span className="text-gray-600 text-sm">PENDING</span>
          </div>

          <div className="flex flex-col content-center items-center py-1">
            <span className="font-extrabold text-lg">
              {event.maximum_participants}
            </span>
            <span className="text-gray-600 text-sm">MAX</span>
          </div>
        </div>

        <GuestListTable
          title="Approved"
          dataset={guestList}
          eventId={id}
          key={`going-${id}`}
        />

        <GuestListTable
          title="Pending"
          dataset={guestList}
          eventId={id}
          setParentGuestList={setGuestList}
          key={`pending-${id}`}
        />

        <div className="w-full mt-2 px-2 border-t-2 border-gray-200">
          {decodedToken?.role === "volunteer" ? (
            !event.has_applied ? (
              <RequestJoinEventButton />
            ) : (
              <CancelRequestEventButton />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
