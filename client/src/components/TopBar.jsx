import React from "react";
import Logo from "./Logo";
import { useScrollDirection } from "../hooks";

const TopBar = () => {
  const scrollDirection = useScrollDirection();
  return (
    <div
      className={`sticky h-30 border-b-2 border-red-900 w-full z-30 ${
        scrollDirection === "down" ? "-top-30" : "top-0"
      } bg-white `}
    >
      <Logo />
    </div>
  );
};

export default TopBar;
