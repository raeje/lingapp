import React from "react";

const EventFormGroupLayout = ({ name, children }) => {
  return (
    <div className="h-max pt-3 pb-6 border-b border-gray-200">
      <h1 className="text-sm font-bold mb-1">{name}</h1>
      {children}
    </div>
  );
};

export default EventFormGroupLayout;
