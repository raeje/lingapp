import React from "react";
import { toast } from "react-toastify";
import { updateGuestList } from "../helpers/api/lingapp/events_user";
import { getGuestList } from "../helpers/api/lingapp/events";
import { useJwt } from "react-jwt";
import { getItem } from "../helpers/localStorage";

const GuestListTable = ({ title, dataset, eventId, setParentGuestList }) => {
  const { decodedToken } = useJwt(getItem("Authorization"));
  const isVisibleClass =
    title === "Approved" ||
    decodedToken?.role === "volunteer" ||
    dataset?.organizer?.id !== decodedToken?.user_id
      ? "hidden"
      : "";
  const thClassName = "text-gray-400";

  const fetchGuestList = async () => {
    try {
      const guestList = await getGuestList(eventId);
      setParentGuestList(guestList);
    } catch (error) {
      console.log(error);
    }
  };

  const filterGuestList = (data) => {
    return title === "Approved"
      ? data.filter((guest) => guest.is_approved)
      : data.filter((guest) => !guest.is_approved);
  };

  const handleApprove = async (guest) => {
    const response = await updateGuestList({
      id: guest.guest_list_id,
      is_approved: true,
    });
    fetchGuestList();

    if (response.status === 200) {
      toast.success(
        `Volunteer ${guest.first_name} ${guest.last_name} approved!`
      );
    } else {
      toast.error(`Failed to approve ${guest.first_name} ${guest.last_name}`);
    }
  };

  const GuestRow = ({ guest }) => {
    return (
      <tr key={guest.id} className="odd:bg-red-50">
        <td className="max-w-max p-2">
          {guest.first_name} {guest.last_name}
        </td>
        <td className={`max-w-1/5 ${isVisibleClass}`}>
          <button
            className="w-full bg-green-500 text-white p-2 rounded-lg font-bold"
            onClick={() => handleApprove(guest)}
          >
            Approve
          </button>
        </td>
      </tr>
    );
  };

  const EmptyRow = () => {
    return (
      <tr>
        <td colSpan={2} className="italic text-gray-400">
          No guests found.
        </td>
      </tr>
    );
  };

  return (
    <div
      className="h-max w-full border-t-2 border-gray-200 py-2"
      key={`${title}-${eventId}`}
    >
      <span className="text-sm font-bold mb-2">{title}</span>
      <table className="w-full mb-2">
        <thead>
          <tr>
            <th className={thClassName}>Full Name</th>
            <th className={`${thClassName} ${isVisibleClass}`}>Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(dataset.guests) && dataset.guests.length > 0 ? (
            filterGuestList(dataset.guests).map((guest) => (
              <GuestRow guest={guest} key={guest.id} />
            ))
          ) : (
            <EmptyRow />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GuestListTable;
