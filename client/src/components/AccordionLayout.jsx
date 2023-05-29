import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const AccordionLayout = ({
  title,
  children,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const handleSetIndex = (index) =>
    activeIndex !== index && setActiveIndex(index);

  return (
    <>
      <div
        onClick={() => handleSetIndex(index)}
        className="flex w-full justify-between p-2 mt-1 rounded bg-red-200"
      >
        <div className="flex">
          <div className="text-red-600 font-bold">{title}</div>
        </div>
        <div className="flex items-center justify-center text-red-600">
          {activeIndex === index ? (
            <ChevronDownIcon className="w-6 h-6" />
          ) : (
            <ChevronUpIcon className="w-6 h-6" />
          )}
        </div>
      </div>

      {activeIndex === index && (
        <div className="shadow-3xl rounded-2xl shadow-cyan-500/50 p-2">
          {children}
        </div>
      )}
    </>
  );
};

export default AccordionLayout;
