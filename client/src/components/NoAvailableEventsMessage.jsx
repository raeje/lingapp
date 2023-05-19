import React from "react";
import logoReverse from "../images/lingapp-logo-reverse.png";

const MESSAGE =
  "There are currently no community events available for this category.";

const NoAvailableEventsMessage = () => {
  return (
    <div className="h-max w-full bg-red-400 p-4 flex-col items-center">
      <img
        src={logoReverse}
        alt="lingapp-logo"
        className="w-3/5 mx-auto mb-2"
      />
      <span className="text-white italic text-lg mb-2">{MESSAGE}</span>
    </div>
  );
};

export default NoAvailableEventsMessage;
