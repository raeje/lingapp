import React from "react";

const EventCategoryCard = ({ image, name, filterEvent }) => {
  return (
    <div
      className="h-52 w-32 md:h-32 border-1 border-gray-400 rounded-2xl overflow-hidden relative shadow-md shadow-black"
      onClick={() => filterEvent(name)}
    >
      <img
        src={image}
        alt="event-category"
        className="object-cover h-full w-full"
      />
      <span className="absolute text-white text-md bottom-1 left-1 w-max bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 px-2 rounded-full ">
        {name}
      </span>
    </div>
  );
};

export default EventCategoryCard;
