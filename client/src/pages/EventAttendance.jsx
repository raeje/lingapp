import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { getGuestList } from "../helpers/api/lingapp/events";
import { updateGuestList } from "../helpers/api/lingapp/events_user";
import { toast } from "react-toastify";

const EventAttendance = () => {
  const { id } = useParams();
  const [organizer, setOrganizer] = useState([]);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchGuestList();
  }, []);

  const fetchGuestList = async () => {
    try {
      const attendees = await getGuestList(id);
      console.log("attendance", attendees);
      setOrganizer(attendees.organizer);
      setAttendees(attendees.guests);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAttendance = async (attendance, bool) => {
    const response = await updateGuestList({
      id: attendance.guest_list_id,
      has_attended: bool,
    });
    fetchGuestList();

    const userFullName = `${attendance.first_name} ${attendance.last_name}`;
    if (response.status === 200) {
      toast.success(
        `Marked ${userFullName} as ${bool ? "PRESENT" : "ABSENT"}.`
      );
    } else {
      toast.error(`Failed to update ${userFullName}'s attendance.`);
    }
  };

  const AtendeeRow = ({ attendee, organizerId }) => {
    return (
      <tr key={attendee.id} className="odd:bg-red-50">
        <td className="w-full p-2">
          {attendee.first_name} {attendee.last_name}
        </td>
        <td className="w-fit grid place-items-center px-2">
          {attendee.user_id !== organizerId ? (
            attendee.has_attended ? (
              <button
                className="w-16 bg-red-500 text-white p-1 rounded-lg font-bold grid place-items-center"
                onClick={() => updateUserAttendance(attendee, false)}
              >
                <XCircleIcon className="h-8 w-8" />
              </button>
            ) : (
              <button
                className="w-16 bg-green-500 text-white p-1 rounded-lg font-bold grid place-items-center"
                onClick={() => updateUserAttendance(attendee, true)}
              >
                <CheckCircleIcon className="h-8 w-8" />
              </button>
            )
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  };

  const AttendanceTable = ({ attendees, organizer }) => {
    const thClassName = "text-gray-400";
    return (
      <table className="w-full my-2">
        <thead>
          <tr>
            <th className={thClassName}>Full Name</th>
            <th className={thClassName}>Action</th>
          </tr>
        </thead>

        <tbody>
          {attendees.map((attendee) =>
            attendee.is_approved ? (
              <AtendeeRow attendee={attendee} organizerId={organizer.id} />
            ) : null
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="h-content w-full bg-white mb-1 flex flex-col p-2 ">
      <div className="h-max w-full bg-white p-2 flex flex-col mb-2 border-b-2 border-gray-200">
        <span className="font-bold mb-2">Summary</span>

        <div className="flex gap-2 mb-4">
          <div className="w-full flex flex-col content-center items-center py-1">
            <span className="font-extrabold text-lg">
              {attendees.filter((attendee) => attendee.has_attended).length ||
                0}
            </span>
            <span className="text-gray-600">PRESENT</span>
          </div>

          <div className="w-full flex flex-col content-center items-center py-1">
            <span className="font-extrabold text-lg">
              {attendees.filter((attendee) => !attendee.has_attended).length ||
                0}
            </span>
            <span className="text-gray-600">ABSENT</span>
          </div>

          <div className="w-full flex flex-col content-center items-center py-1">
            <span className="font-extrabold text-lg">
              {attendees.length || 0}
            </span>
            <span className="text-gray-600">EXPECTED</span>
          </div>
        </div>
      </div>

      <AttendanceTable attendees={attendees} organizer={organizer} />
    </div>
  );
};

export default EventAttendance;
