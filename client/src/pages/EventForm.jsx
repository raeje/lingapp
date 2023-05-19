import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EventFormGroupLayout } from "../components";
import { createEvent } from "../helpers/api/lingapp/events";

const initEventForm = {
  barangay: "",
  category: "",
  city: "",
  description: "",
  ends_at: "",
  house: "",
  landmark: "",
  maximum_participants: "",
  name: "",
  notes: "",
  starts_at: "",
  image: "",
};

const EventForm = () => {
  const [eventForm, setEventForm] = useState(initEventForm);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;

    const newValue = () => {
      if (name === "image") return files[0];

      if (type === "datetime-local") return new Date(value).toISOString();

      return value;
    };

    setEventForm({
      ...eventForm,
      [name]: newValue(),
    });
  };

  const handleCreate = async () => {
    console.log(eventForm);
    const response = await createEvent(eventForm);

    if (response.status === 201) {
      console.log(response.data);
      //navigate("/");
    } else {
      console.log(response.errors);
    }
  };

  return (
    <div className="h-max w-full md:w-80 px-2 pt-2 pb-24 mb-8 bg-white">
      <h1 className="text-xl font-bold pb-4 border-b border-gray-200">
        Community Event Form
      </h1>
      <EventFormGroupLayout name="Basic Information">
        <span className="text-xs pl-1 text-gray-400">Event Name</span>
        <input
          type="text"
          name="name"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md bg-gray-50"
          onChange={handleFormChange}
        />

        <span className="text-xs pl-1 text-gray-400">Start</span>
        <input
          type="datetime-local"
          name="starts_at"
          step="900"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md col-start-1 row-start-2 bg-gray-50"
          onChange={handleFormChange}
        />

        <span className="text-xs pl-1 text-gray-400">End</span>
        <input
          type="datetime-local"
          name="ends_at"
          step="900"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md col-start-2 row-start-2 bg-gray-50"
          onChange={handleFormChange}
        />
      </EventFormGroupLayout>

      <EventFormGroupLayout name="Event Details">
        <span className="text-xs pl-1 text-gray-400">Description</span>
        <textarea
          name="description"
          className="w-full py-2 px-2 border border-gray-200 rounded-md bg-gray-50"
          placeholder="describe your event here.."
          onChange={handleFormChange}
        />

        <span className="text-xs pl-1 text-gray-400">Max Participants</span>
        <input
          type="number"
          name="maximum_participants"
          min="2"
          placeholder="2"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md bg-gray-50"
          onChange={handleFormChange}
        />

        <span className="text-xs pl-1 text-gray-400">Cover Photo</span>
        <input
          type="file"
          alt="event-image"
          name="image"
          className="block w-full border border-gray-300 rounded-md cursor-pointer bg-gray-50 file:bg-red-300 p-2 file:mr-4 file:text-white file:border file:border-red-400 file:rounded-lg file:px-2"
          onChange={handleFormChange}
        />
      </EventFormGroupLayout>

      <EventFormGroupLayout name="Event Location">
        <span className="text-xs pl-1 text-gray-400">City</span>
        <input
          type="text"
          name="city"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md bg-gray-50"
          onChange={handleFormChange}
        />

        <span className="text-xs pl-1 text-gray-400">Barangay</span>
        <input
          type="text"
          name="barangay"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md bg-gray-50"
          onChange={handleFormChange}
        />

        <span className="text-xs pl-1 text-gray-400">House No. / Street</span>
        <input
          type="text"
          name="house"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md bg-gray-50"
          onChange={handleFormChange}
        />

        <span className="text-xs pl-1 text-gray-400">Landmark</span>
        <input
          type="text"
          name="landmark"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md bg-gray-50"
          onChange={handleFormChange}
        />
      </EventFormGroupLayout>

      <EventFormGroupLayout name="Event Category">
        <span className="text-xs pl-1 text-gray-400">Category</span>
        <select
          type="text"
          name="category"
          id="category"
          className="w-full py-2 px-2 mb-2 border border-gray-200 rounded-md bg-gray-50"
          value={eventForm.category}
          onChange={handleFormChange}
        >
          <option value=""></option>
          <option value="animal">Animal</option>
          <option value="cultural">Cultural</option>
          <option value="disaster">Disaster</option>
          <option value="education">Education</option>
          <option value="environment">Environment</option>
          <option value="health">Health</option>
          <option value="social">Social</option>
        </select>
      </EventFormGroupLayout>

      <div className="h-max p-2 border-b border-gray-200 grid place-items-center">
        <button
          className="bg-red-400 border border-red-400 rounded-full py-2 px-4 text-xl text-white font-bold my-2"
          onClick={handleCreate}
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default EventForm;
