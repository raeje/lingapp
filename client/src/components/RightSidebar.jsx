import React, { useState } from "react";
import {
  InformationCircleIcon,
  FireIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { RiGithubFill } from "react-icons/ri";
import AccordionLayout from "./AccordionLayout";

const RightSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="h-screen w-80 fixed top-0 right-0 z-10 box-border bg-gray-100 pt-16 px-2">
      <div className="flex flex-col justify-center items-center">
        <a
          href="https://github.com/raeje/lingapp"
          target="_blank"
          rel="noreferrer noopener"
          className="w-full flex items-center hover:bg-red-100 hover:text-red-600 py-2 px-4 rounded-md text-lg bg-red-500 text-white font-bold my-6"
        >
          <RiGithubFill className="h-5 w-5 mr-2" />
          Github Repo
        </a>

        <AccordionLayout
          title="About"
          index={1}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <span className="text-xs text-gray-700 indent-8">
            The name{" "}
            <span className="font-bold text-red-600 text-md italic">
              "LingApp"
            </span>{" "}
            is derived from the Tagalog word{" "}
            <span className="font-bold text-md italic">"lingap"</span>, which
            means <span className="font-bold text-md italic">"care"</span> or{" "}
            <span className="font-bold text-md italic">"compassion"</span>. It
            embodies the core purpose of the platform, which is to facilitate
            connections and support between organizers and volunteers for
            community events.
          </span>
        </AccordionLayout>

        <AccordionLayout
          title="Goal and Purpose"
          index={2}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <span className="text-xs text-gray-700 indent-8">
            <span className="font-bold text-md italic">
              The primary goal of LingApp is to provide a platform where
              organizers can easily set up and manage community events.
            </span>{" "}
            Organizers can create event listings, provide detailed information
            about the event, specify the date, time, and location, and outline
            the tasks or activities involved. They can also set criteria for
            volunteers, such as specific skills or interests, and establish the
            maximum number of volunteers needed.
          </span>
        </AccordionLayout>

        <AccordionLayout
          title="Tech Behind the Project"
          index={3}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <span className="text-xs text-gray-700 indent-8">
            <span className="font-bold text-md italic">
              LingApp is a full-stack web application
            </span>{" "}
            that combines the power of{" "}
            <span className="font-bold text-md italic">Ruby on Rails</span> for
            the backend and{" "}
            <span className="font-bold text-md italic">React</span> with{" "}
            <span className="font-bold text-md italic">Tailwind CSS</span> for
            the frontend. The combination of these technologies allows for a
            modern and efficient web application, providing a seamless user
            interface and a great user experience.
          </span>
        </AccordionLayout>
      </div>
    </div>
  );
};

export default RightSidebar;
