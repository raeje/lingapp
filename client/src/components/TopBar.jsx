import React from "react";
import Logo from "./Logo";
import { useScrollDirection } from "../hooks";

const TopBar = () => {
  const scrollDirection = useScrollDirection();
  return (
    <div
      className={`sticky bg-white h-30 flex content-center border-b-2 border-red-900 w-full z-3 ${
        scrollDirection === "down" ? "-top-30" : "top-0"
      }`}
    >
      <Logo />
    </div>
  );
};

export default TopBar;
